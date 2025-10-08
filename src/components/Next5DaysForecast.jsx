import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import DailyForecast from "./DailyForecast"

function Next5DaysForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);

    if (!weatherData) {
      return null;
    }


  const groupedByDay = {};
  weatherData.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const dates = Object.keys(groupedByDay)
    .filter(date => date >= tomorrowStr)
    .sort();

  const dailyForecast = dates.slice(0, 5).map(date => {
    const dayData = groupedByDay[date];
    const temps = dayData.map(d => d.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    const noonData = dayData.find(d => d.dt_txt.includes("12:00:00")) || dayData[0];

    return {
      date,
      min,
      max,
      icon: noonData.weather[0].icon,
      desc: noonData.weather[0].description,
      wind: noonData.wind.speed,
    };
  });
  
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