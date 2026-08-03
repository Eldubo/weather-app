
import React from "react";
import { resultadoConsultaContext } from '../context/weather-contexts';
import DailyForecast from "./DailyForecast"

function Next5DaysForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);

    if (!weatherData || !Array.isArray(weatherData.list) || weatherData.list.length === 0) {
      return null;
    }

    const groupedByDay = {};
    weatherData.list.forEach(item => {
      const date = item.dt_txt?.split(" ")[0];
      if (!date) return;

<<<<<<< Updated upstream
  // ---- AGRUPAR POR DÍA PARA LOS 5 DÍAS ----
  const groupedByDay = {};
  
    weatherData.list.forEach(item => {
      // Convertimos el timestamp a la zona horaria de Buenos Aires
      const dateObj = new Date(item.dt * 1000); // `item.dt` es el timestamp
      const localDate = dateObj.toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
      console.log(localDate);
      if (!groupedByDay[localDate]) {
        groupedByDay[localDate] = [];
      }
      groupedByDay[localDate].push(item);
    });

  // Armamos un array con las mínimas y máximas por día
  const dailyForecast = Object.keys(groupedByDay).map(date => {
    const dayData = groupedByDay[date];
    const temps = dayData.map(d => d.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
  
    // Tomamos el icono del mediodía si existe, o el primero
    const noonData = dayData.find(d => d.dt_txt.includes("12:00:00")) || dayData[0];
    
    // Convertir la fecha a un formato válido (si ya es solo una cadena de texto tipo "yyyy-mm-dd")
    const localDate = new Date(date + 'T00:00:00'); // Esto asegura que la fecha tenga formato ISO
    
    return {
      date: localDate,
      min,
      max,
      icon: noonData.weather[0].icon,
      desc: noonData.weather[0].description,
      wind: noonData.wind.speed,
    };
  }).slice(1, 5);
=======
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(item);
    });

    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

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
>>>>>>> Stashed changes
  
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