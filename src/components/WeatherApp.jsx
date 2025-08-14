import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weather-app-service';
import {  useResultado } from 'src/context/resultadoConsultaContext.jsx';

export const WeatherApp = () => {
  const {setWeatherData} = useResultado();
  const [error, setError] = useState('');
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(city);
        
        // Verifica si los datos actuales y el pronóstico fueron recibidos correctamente
        if (data && data.current) {
          setWeatherData(data.current);
          setError('');

          // Filtra los datos del pronóstico para mostrar uno por día (primer dato de cada día)
          const forecast = data.forecast?.list.filter((item, index, arr) => {
            // Selecciona solo el primer dato de cada día (por ejemplo, a las 12:00)
            return index % 8 === 0;  // Los datos están cada 3 horas, 8 datos = 24 horas (1 día)
          });

          setForecastData(forecast);
        } else {
          setError('No se pudieron obtener los datos del clima.');
          setWeatherData(null);
        }
      } catch (err) {
        setError('Error al obtener los datos del clima');
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Clima actual */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys?.country}</h2>
          <p>Temperatura: {weatherData.main?.temp} °C</p>
          <p>Descripción: {weatherData.weather?.[0]?.description}</p>
          <p>Humedad: {weatherData.main?.humidity} %</p>
          <p>Viento: {weatherData.wind?.speed} m/s</p>
        </div>
      )}
      
      {/* Pronóstico de los próximos días */}
      {forecastData.length > 0 && (
        <div>
          <h3>Pronóstico de los próximos días:</h3>
          <div>
            {forecastData.map((day, index) => (
              <div key={index}>
                <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
                <p>Temperatura máxima: {day.main.temp_max} °C</p>
                <p>Temperatura mínima: {day.main.temp_min} °C</p>
                <p>Descripción: {day.weather[0]?.description}</p>
                <p>Viento: {day.wind?.speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
