import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import HourlyForecast  from './HourlyForecast'


function Next24HoursForecast() {
    const { weatherData } = React.useContext(resultadoConsultaContext);
    const list = weatherData?.list;

    if (!Array.isArray(list) || list.length === 0) return null;

    const now = Date.now() / 1000; // tiempo actual en segundos (dt está en segundos)

    const next24hForecast = list.filter(item => {
      return item.dt > now && item.dt <= now + 24 * 3600;
    });
      

  return (
    <div className="hours24-section">
    <h3>Próximas 24 horas</h3>
    <div className="hours24-list">
      {next24hForecast.map((item, i) => (
        <HourlyForecast climaHora = {item} key={item?.dt ?? Math.random()} /> 
      ))}
    </div>
  </div>

  
  );
}

export default Next24HoursForecast;