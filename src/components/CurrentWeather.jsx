
import React, { useContext } from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

export const CurrentWeather = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }
  const current = weatherData.list?.[0];

  return (
    <div className="weather-container">
            {/* Clima actual */}
            <div className="weather-header">
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${current.weather?.[0]?.icon}@4x.png`}
          alt={current.weather?.[0]?.description}
        />
        <h2>
          {weatherData.city?.name}, {weatherData.city?.country}
        </h2>
      </div>
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
    </div>
  );
};

export default CurrentWeather;
