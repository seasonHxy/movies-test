import { useEffect, useState } from "react";
import dataService from "../../service/dataService";
import MediaCard from "../common/MediaCard";
import styles from './index.css';
import { useHistory } from 'react-router-dom';
import setTheme  from "../common/theme";
function MovieContainer() {
  const [data, setData] = useState([]);
  const [dom, setDom] = useState(null);
  const [dark, setDark] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const currentPage = 1;
  const pageSize = 10;

  useEffect(() => {
    dataService.get().then((response) => {
      console.log("response:",response)
      let sourceList = response.data.results
      let totalPage = sourceList.length / pageSize

      let list = getList(currentPage, sourceList)
      setData(list);
      localStorage.setItem("FILMLISTM", JSON.stringify(response.data.results));

      addEventListener("scroll", (e) => {
        throttle(handleOnScroll(currentPage, totalPage, sourceList), 500)
      })
    });
    return ()=>{
      setData([]);
    }
  }, []);
  
  // 获取每页面数据
  const getList = (currentPage, sourceList)=>{
      let begin = (currentPage - 1) * pageSize;
      let end = currentPage * pageSize;
      const list = sourceList.slice(begin, end)
      return list
  }

  // 截流
  function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

  const handleOnScroll = (currentPage, totalPage, sourceList) => {
    let locked = false;

    //文档内容实际高度（包括超出视窗的溢出部分）
    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    //滚动条滚动距离
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //窗口可视范围高度
    var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
    
    if(!locked && currentPage < totalPage && clientHeight + scrollTop >= scrollHeight){
        locked = true
        let list = getList(currentPage + 1, sourceList);
        data.push(list);
        setData(sourceList);
    }

};
  // 切换主题
  const changeTheme = () =>{
    if(!dark) {
      setTheme("dark")
      setDark(true)
    } else {
      setTheme("light")
      setDark(false)
    }    
  }
  return (
    <div>
     <div className='wrapper'>
      <input type="checkbox" id='checkLabel' onClick={()=> changeTheme()}/>
        <label htmlFor="checkLabel"></label>
      </div>

      <h1 className="title"> Movies Now Playing </h1>
      <div 
        className='container' 
        ref={(dom) => {
          setDom(dom);
        }}
        >
      {data
        // .filter((element) => element.programType === "movie")
        .map((element) => (
          <MediaCard
            key={element.id}
            title={element.title}
            imageUrl={element.poster_path}
            backUrl={element.backdrop_path}
            toNext={()=> history.push(`/film/${element.id}`)}
          />
        ))}
      </div>
      
      
    </div>
  );
}

export default MovieContainer;
