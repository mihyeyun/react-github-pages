import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";
import styled from "styled-components";
import "./weather.scss";
import img from "./spinner.gif";

function Weather() {
  let [weather, setWeather] = useState({});
  let [age, setAge] = useState(0);
  let [gender, setGender] = useState("여자");
  let [isPending, startTransition] = useTransition();
  let [tempColor, setTempColor] = useState("blue");
  let [count, setCount] = useState(0);

  const MIN_DURATION = 10;

  // 날씨 정보 가져오기
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=59c1599489e7fc68d18e4e824ebc1caa`
      )
      .then((response) => {
        console.log(response.data);
        setWeather({
          id: response.data.weather[0].id,
          temperatuer: response.data.main.temp,
          sky: response.data.weather[0].main,
          description: response.data.weather[0].description,
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // 날씨 코드에 따라 배경화면 바꾸기
  useEffect(() => {
    changeColor();
  });

  function changeColor() {
    let content = weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
    console.log(content)
    switch (content) {
      case 0:
        return setTempColor("#e0f7fa");
      // clear
      case 2:
        return setTempColor("#90a4ae");
      // Thunderstorm
      case 3:
        return setTempColor("#e8f5e9");
      // Drizzle
      case 5:
        return setTempColor("#c5cae9");
      // Rain
      case 6:
        makeSnowflake();
        for (let i = 0; i < 50; i++) {
          setTimeout(makeSnowflake, 3000 * i);
        }
        return setTempColor("#90a4ae");
      // Snow
      case 7:
        return setTempColor("#eeeeee");
      // Atmosphere
      case 8:
        return setTempColor("#cfd8dc");
      // Clouds
      default:
        setTempColor("white");
    }
  }

  // 눈 내리기
  function makeSnowflake() {
    const snowflake = document.createElement("div");
    const delay = Math.random() * 10;
    const initialOpacity = Math.random();
    const duration = Math.random() * 20 + MIN_DURATION;

    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = initialOpacity;
    snowflake.style.animationDuration = `${duration}s`;

    document.querySelector(".start").appendChild(snowflake);

    setTimeout(() => {
      document.querySelector(".start").removeChild(snowflake);
      makeSnowflake();
    }, (duration + delay) * 1000);
  }

  return (
    <Wrap className="container-weather" bg={tempColor}>
      <div className="start"></div>
      <div className="content-weather">
        <h2>Seoul</h2>
        <div>temperature : {(weather.temperatuer - 273.15).toFixed(1)}°C</div>
        <div>sky: {weather.sky}</div>
        <input
        className="input-age"
          type="text"
          placeholder="나이"
          onKeyDown={(e) => {
            setAge(e.target.value);
          }}
        ></input>
        <input
        className="input-gender"
          type="text"
          placeholder="성별"
          onKeyDown={(e) => {
            setGender(e.target.value);
          }}
        ></input>

        <div className="chat-box">
          AI 추천 fashion 입니다
          <br />
          <div className="chat-content"></div>
        </div>
        <button
          className="btn-white"
          onClick={() => {
            setCount(count + 1);
            console.log(count);
            if (count > 0) {
              document.querySelector(".chat-content").innerHTML = "";
            }
            let loading = `<img src=${img} /><br><div>답변을 생각하는 중이에요.<br>조금만 기다려주세요</div>`;
            document
              .querySelector(".chat-content")
              .insertAdjacentHTML("beforeend", loading);

            const configuration = new Configuration({
              apiKey: "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",
            });
            const openai = new OpenAIApi(configuration);

            openai
              .createCompletion({
                model: "text-davinci-003",
                prompt: `briefly recommend clothes suitable for the Celsius ${(
                  weather.temperatuer - 273.15
                ).toFixed(1)} for a ${age}-year-old ${gender} in Korean`,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              })
              .then((result) => {
                startTransition(() => {
                  let template = `<span>${result.data.choices[0].text}</span>`;
                  document.querySelector(".chat-content").innerHTML = template;
                });
              })
              .catch(() => {
                alert("오류가 났어요! 재시도해주세요");
              });
          }}
        >
          보기
        </button>
      </div>
    </Wrap>
  );
}

export default Weather;

const Wrap = styled.div`
  background: ${(props) => props.bg};
`;
