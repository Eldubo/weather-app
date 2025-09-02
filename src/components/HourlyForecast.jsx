import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

function HourlyForecast({climaHora}) {
  if (!climaHora || typeof climaHora.dt !== "number") return null;

  
  const hour = new Date(climaHora.dt * 1000)
    .getHours()
    .toString()
    .padStart(2, "0");

  const icon = climaHora.weather?.[0]?.icon;
  const desc = climaHora.weather?.[0]?.description || "";
  const temp = climaHora.main?.temp;

  return (
        <div className="today-card" >
          <p>{hour}:00</p>
          {icon ? (<img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={desc}
          />
          ) : null}
               {typeof temp === "number" ? <p>{Math.round(temp)}°C</p> : null}
        </div>

  
  );
}

export default HourlyForecast;