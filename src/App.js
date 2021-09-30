import React, { useEffect, useState } from "react";
import styled from "@emotion/react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import "./App.css";

const API_KEY = "880ba462f7312ae101dee1e9f46a1fad";

const App = () => {
  const [cityToSearch, setCityToSearch] = useState("warsaw");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [iconID, setIconID] = useState("");
  const [description, setDescription] = useState("");
  const adres = `http://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${API_KEY}&units=metric`;
  const urlIcon = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
  const fetchData = async () => {
    const response = await fetch(adres);
    const data = await response.json();
    console.log(data);
    setCity(data.name);
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setPressure(data.main.pressure);
    setIconID(data.weather[0].icon);
    setDescription(data.weather[0].main);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  const style = {
    container: css`
      text-align: center;
    `,
    main: css`
      flex-direction: column;

      display: flex;
      justify-content: center;
      background-color: ${description === "Clouds" && "blue"};
      background-color: ${description === "Thunderstorm" && "grey"};
    `,
    city: css`
      color: blue;
    `,
    image: css`
      width: 100px;
    `,
  };
  return (
    <div css={style.container}>
      <input
        value={cityToSearch}
        onChange={(e) => setCityToSearch(e.target.value)}
      />
      <button onClick={handleSearch}>szukaj</button>
      <div css={style.main}>
        <div css={style.city}>Nazwa miasta: {city}</div>
        <div>Temperatura: {temp} stopni celcjusza</div>
        <div>Cisnienie: {humidity}</div>
        <div>Wilgotnosc: {pressure} </div>
        <div>opis: {description}</div>
        <div>
          <img css={style.image} src={urlIcon} />
        </div>
      </div>
    </div>
  );
};

export default App;
