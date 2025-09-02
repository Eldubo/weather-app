
import React, {useContext} from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';

export const CurrentWeather = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }

  const current = weatherData.list?.[0];

  return (

<div className="weather-container">
{/* Clima actual */}
<div className="weather-header">
  <img
    className="weather-icon"
    src={`https://openweathermap.org/img/wn/${current.weather?.[0]?.icon}@4x.png`}
    alt={current.weather?.[0]?.description}
  />
  <div>
    <h2>
      {weatherData.city?.name}, {weatherData.city?.country}
    </h2>
    <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
      {Math.round(current.main?.temp)}°C
    </p>
    <p>{current.weather?.[0]?.description}</p>
  </div>
</div>
</div>
  );

  };