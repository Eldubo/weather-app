import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

function HourlyForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);

    const now = Date.now() / 1000; // tiempo actual en segundos (dt está en segundos)

    const next24hForecast = weatherData.list.filter(item => {
      return item.dt > now && item.dt <= now + 24 * 3600;
    });
      

  return (
        <div className="today-card" key={i}>
          <p>{new Date(item.dt * 1000).getHours()}:00</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
          />
          <p>{Math.round(item.main.temp)}°C</p>
        </div>

  
  );
}

export default Next24HoursForecast;