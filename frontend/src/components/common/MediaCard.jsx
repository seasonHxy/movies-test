import React from "react";
import commonStyle from "./common.css";

export default function MediaCard(props) {

  const { title, imageUrl, toNext} = props;

  return (
    <div className="item" onClick={toNext}>
      <section className="item"> 
        <img 
          className="img-size" 
          src={'https://image.tmdb.org/t/p/w300'+imageUrl} 
          alt=""
        />
        <div className="film-title">{title}</div>
      </section>
      </div>
  );
}
