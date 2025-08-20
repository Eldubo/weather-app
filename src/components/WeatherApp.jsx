import React, { useContext } from 'react';
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import { colorPantallaContext } from '../context/colorPantallaContext';
import DailyForecast from './Next5DaysForecast';
import HourlyForecast from './Next24HoursForecast';
import CurrentWeather from './CurrentWeather';

const WeatherApp = () => {
  const { weatherData } = useContext(resultadoConsultaContext);

  if (!weatherData) {
    return <p>Busca una ciudad para ver el clima.</p>;
  }

  return (
      <CurrentWeather></CurrentWeather>
      <HourlyForecast></HourlyForecast> 
      <DailyForecast></DailyForecast>
  );
};

export default WeatherApp;
