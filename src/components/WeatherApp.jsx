import React, { useContext } from 'react';
import '../styles/weather-info.css';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import { colorPantallaContext } from '../context/colorPantallaContext';

const WeatherApp = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }

  const current = weatherData.list?.[0]; // el primer registro es el más cercano al momento actual
  const todayDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  // ---- HOY (cada 3 horas) ----
  const todayForecast = weatherData.list.filter(item =>
    item.dt_txt.startsWith(todayDate)
  );

  // ---- AGRUPAR POR DÍA PARA LOS 5 DÍAS ----
  const groupedByDay = {};
  weatherData.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0]; // yyyy-mm-dd
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  // Armamos un array con las mínimas y máximas por día
  const dailyForecast = Object.keys(groupedByDay).map(date => {
    const dayData = groupedByDay[date];
    const temps = dayData.map(d => d.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    // Tomamos el icono del mediodía si existe, o el primero
    const noonData = dayData.find(d => d.dt_txt.includes("12:00:00")) || dayData[0];

    return {
      date,
      min,
      max,
      icon: noonData.weather[0].icon,
      desc: noonData.weather[0].description,
      wind: noonData.wind.speed,
    };
  }).slice(0, 5); // próximos 5 días

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

      {/* Pronóstico de HOY cada 3 horas */}
      <div className="today-section">
        <h3>Hoy</h3>
        <div className="today-list">
          {todayForecast.map((item, i) => (
            <div className="today-card" key={i}>
              <p>{new Date(item.dt * 1000).getHours()}:00</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pronóstico próximos 5 días */}
      <div className="forecast-section">
        <h3>Próximos 5 días</h3>
        <div className="forecast-list">
          {dailyForecast.map((day, idx) => (
            <div className="forecast-card" key={idx}>
              <h4>{new Date(day.date).toLocaleDateString("es-AR", { weekday: 'short', day: 'numeric' })}</h4>
              <img
                className="forecast-icon"
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.desc}
              />
              <div className="forecast-temp">
                <span>Máx: {Math.round(day.max)}°C</span><br />
                <span>Mín: {Math.round(day.min)}°C</span>
              </div>
              <div className="forecast-desc">{day.desc}</div>
              <div style={{ fontSize: '0.95rem', color: '#b8c1ec' }}>
                Viento: {day.wind} m/s
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
