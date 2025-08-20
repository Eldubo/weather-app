import React, { useContext } from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import { CurrentWeather } from './CurrentWeather.jsx';

export const WeatherApp = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }

  // El pronóstico está en weatherData.list (por ser la respuesta de /forecast)
  const forecastData = weatherData.list
    ? weatherData.list.filter((item, idx) => idx % 8 === 0)
    : [];

  return (
    <div className="weather-container">
      <CurrentWeather />
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
