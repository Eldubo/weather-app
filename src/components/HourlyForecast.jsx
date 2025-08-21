import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

function HourlyForecast({climaHora}) {

  return (
        <div className="today-card" >
          <p>{new Date(climaHora.dt * 1000).getHours()}:00</p>
          <img
            src={`https://openweathermap.org/img/wn/${climaHora.weather[0].icon}@2x.png`}
            alt={climaHora.weather[0].description}
          />
          <p>{Math.round(climaHora.main.temp)}°C</p>
        </div>

  
  );
}

export default HourlyForecast;