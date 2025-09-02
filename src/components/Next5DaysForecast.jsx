
import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import DailyForecast from "./DailyForecast"

function Next5DaysForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);

    if (!weatherData) {
      return null;
    }


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
     // próximos 5 días
     

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
  }).slice(0, 5);
  
  return (
    <div className="daily-forecast">
        
        <div className="forecast-section">
        <h3>Próximos 5 días</h3>
        <div className="forecast-list">
          {dailyForecast.map((day, idx) => (
            <DailyForecast climaDia={day} key={idx} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Next5DaysForecast;