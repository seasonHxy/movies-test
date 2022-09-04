export default function setTheme(theme = "light") {
    // 检测是否支持css变量
    if (!window?.CSS?.supports("background", 0)) return false;

    // 设置主题
    const Theme = {
        dark: "#3f3f3f",
        light: "#f9f9f9",
    };
    document.documentElement.style.background = Theme[theme];
}
