import { useEffect, useState } from "react";
import "./intro.scss";


export default function Intro() {

  const text = '프론트엔드 개발자입니다';
  const [arr, setArr] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
     
      setArr((prev) => {
        let result = prev ? prev + text[count] : text[0];
        setCount(count + 1);
    
        if (count >= text.length) {
          setCount(0);
          setArr('');
        }
        return result;
      });
    }, 150);

    return () => {
      clearInterval(typing)
    };
    
});

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imgContainer">
          <img src="/img/pic.png" alt="" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>안녕하세요</h2>
          <h1>윤미혜입니다</h1>
          <h3>저는 <span>{arr}</span></h3>
        </div>
        <a href="#portfolio">
        
        </a>
      </div>
    </div>
  );
}
