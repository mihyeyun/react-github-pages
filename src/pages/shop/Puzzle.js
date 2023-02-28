import { useEffect, useState } from "react";
import styled from "styled-components";
import Cards from "./Cards.js";

function Puzzle({ couponHandler, setShowGame }) {
  const [gameResult, setGameResult] = useState(0);

  function changedata(data) {
    setGameResult(data);
    console.log(gameResult);
  }
  let sec = 22;

  useEffect(() => {
    setInterval(() => {
      sec -= 1;
      if (sec >= 0) {
        document.querySelector(".sec").innerHTML = sec;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    let start = setTimeout(() => {
      document.querySelector(".start").style.display = "none";
    }, 1000);
    let gameover = setTimeout(() => {
      if (gameResult == 2) {
        changedata();
        document.querySelector(".fail").style.display = "block";
        setTimeout(() => {
          setShowGame(false);
        }, 1000);
      }
    }, 20000);
    if (gameResult == 3) {
      changedata();
      document.querySelector(".success").style.display = "block";
      couponHandler(1000);
      setTimeout(() => {
        setShowGame(false);
      }, 2000);
    }

    return () => {
      clearTimeout(start);
      clearTimeout(gameover);
    };
  });

  return (
    <Wrap>
      <div className="wrapping">
        <h1>
          Grab your chance in <span className="sec">22</span> seconds.
        </h1>
        <Cards changedata={changedata} />
      </div>
      <div className="start">
        <img className="start-img" src="/img/start.png" width="300px"></img>
      </div>
      <div className="success" style={{ display: "none" }}>
        <div className="white-bg">
          <p>
            🎉<span style={{ color: "red" }}>축</span>
            <span style={{ color: "yellow" }}>하</span>
            <span style={{ color: "green" }}>합</span>
            <span style={{ color: "blue" }}>니</span>
            <span style={{ color: "pupple" }}>다</span>🎉
          </p>
          <p>1,000원 할인쿠폰이 발급되었습니다</p>
          <img className="win-img" src="/img/win.png" width="300px"></img>
        </div>
      </div>
      <div className="fail" style={{ display: "none" }}>
        <img className="fail-img" src="/img/fail.png" width="300px"></img>
      </div>
    </Wrap>
  );
}

export default Puzzle;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .box {
    height: 700px;
    width: 700px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1em;
  }
  .card {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(180deg);
    animation: 2s hideCard linear;
    transition: transform 0.5s;
  }
  @keyframes hideCard {
    0%,
    70% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(180deg);
    }
  }
  .card img {
    max-width: 80%;
    max-height: 80%;
    transform: scale(0);
    animation: 2s hideImage linear;
  }
  @keyframes hideImage {
    0%,
    70% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  .card.active {
    transform: rotateY(0);
  }
  .card.correct {
    background-color: green;
  }
  .card.wrong {
    background-color: pink;
  }
  .card.active img {
    transform: scale(1);
  }
  .start,
  .success,
  .fail {
    position: fixed;
    margin: auto;
    padding: 30px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .white-bg {
    background: white;
    padding: 30px;
    border-radius: 5px;
  }
  .start-img,
  .fail-img {
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .win-img {
    position: fixed;
    margin: 0 auto;
    top: 300px;
    left: 0;
    right: 0;
  }
`;
