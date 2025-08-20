import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import {HourlyForecast}  from './CurrentWeather'


function Next24HoursForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);

    const now = Date.now() / 1000; // tiempo actual en segundos (dt está en segundos)

    const next24hForecast = weatherData.list.filter(item => {
      return item.dt > now && item.dt <= now + 24 * 3600;
    });
      

  return (
    <div className="24hours-section">
    <h3>Próximas 24 horas</h3>
    <div className="24hours-list">
      {next24hForecast.map((item, i) => (
        <HourlyForecast /> 
      ))}
    </div>
  </div>

  
  );
}

export default Next24HoursForecast;