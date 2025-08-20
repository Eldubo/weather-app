
import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

function Next5DaysForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);


    const noonData = dayData.find(d => d.dt_txt.includes("12:00:00")) || dayData[0];

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
    <div className="daily-forecast">
        
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
}

export default Next5DaysForecast;