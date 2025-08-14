import React, { useContext } from 'react';
import '../styles/weather-info.css';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

export const WeatherApp = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }

  // El pronóstico está en weatherData.list (por ser la respuesta de /forecast)
  const forecastData = weatherData.list
    ? weatherData.list.filter((item, idx) => idx % 8 === 0)
    : [];

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

      {/* Pronóstico */}
      {forecastData.length > 0 && (
        <div className="forecast-section">
          <h3>Pronóstico de los próximos días:</h3>
          <div className="forecast-list">
            {forecastData.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
                <img
                  className="forecast-icon"
                  src={`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
                  alt={day.weather[0]?.description}
                />
                <div className="forecast-temp">
                  <span>Máx: {day.main.temp_max}°C</span><br />
                  <span>Mín: {day.main.temp_min}°C</span>
                </div>
                <div className="forecast-desc">{day.weather[0]?.description}</div>
                <div style={{ fontSize: '0.95rem', color: '#b8c1ec' }}>
                  Viento: {day.wind?.speed} m/s
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
