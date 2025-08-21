
import React from "react";
import { resultadoConsultaContext } from '../context/resultadoConsultaContext';
import Next24HoursForecast from './components/Next24HoursForecast';
import Next5DaysForecast from './components/Next5DaysForecast';
import { CurrentWeather } from './components/CurrentWeather';


function WeatherApp() {

    

  return (
    <CurrentWeather />
    <Next24HoursForecast/>
    <Next5DaysForecast />
  
  );
}

export default WeatherApp;