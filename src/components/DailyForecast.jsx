import React, { useContext } from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import { colorPantallaContext } from '../context/colorPantallaContext';


const DailyForecast = ({climaDia}) => {

  return (
    <div className="forecast-card" >
    <h4>{new Date(climaDia.date).toLocaleDateString("es-AR", { weekday: 'short', day: 'numeric' })}</h4>
    <img
      className="forecast-icon"
      src={`https://openweathermap.org/img/wn/${climaDia.icon}@2x.png`}
      alt={climaDia.desc}
    />
    <div className="forecast-temp">
      <span>Máx: {Math.round(climaDia.max)}°C</span><br />
      <span>Mín: {Math.round(climaDia.min)}°C</span>
    </div>
    <div className="forecast-desc">{climaDia.desc}</div>
    <div style={{ fontSize: '0.95rem', color: '#b8c1ec' }}>
      Viento: {climaDia.wind} m/s
    </div>
  </div>
  );
};

export default DailyForecast;
