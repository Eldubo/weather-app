
import React from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

export const CurrentWeather = () => {
  const { weatherData } =React. useContext(resultadoConsultaContext);

  const current = weatherData.list?.[0];

    // Tomamos el icono del mediodía si existe, o el primero
    /*
<div className="weather-main">
        <div className="weather-main-info">
          <p><strong>Temperatura:</strong> {current.main?.temp} °C</p>
          <p><strong>Sensación térmica:</strong> {current.main?.feels_like} °C</p>
          <p><strong>Humedad:</strong> {current.main?.humidity} %</p>
          <p><strong>Presión:</strong> {current.main?.pressure} hPa</p>
          <p><strong>Viento:</strong> {current.wind?.speed} m/s</p>
          <p><strong>Descripción:</strong> {current.weather?.[0]?.description}</p>
        </div>
      </div>
    */

  return (

<div className="weather-container">
{/* Clima actual */}
<div className="weather-header">
  <img
    className="weather-icon"
    src={`https://openweathermap.org/img/wn/${current.weather?.[0]?.icon}@4x.png`}
    alt={current.weather?.[0]?.description}
  />
  <div>
    <h2>
      {weatherData.city?.name}, {weatherData.city?.country}
    </h2>
    <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
      {Math.round(current.main?.temp)}°C
    </p>
    <p>{current.weather?.[0]?.description}</p>
  </div>
</div>
</div>
  );


export default CurrentWeather;
