import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weather-app-service';

export const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(city);

        if (data && data.current) {
          setWeatherData(data.current);
          setError('');

          if (data.forecast?.list) {
            const forecast = data.forecast.list.filter((item, index) => index % 8 === 0);
            setForecastData(forecast);
          } else {
            setForecastData([]);
          }
        } else {
          setError('No se pudieron obtener los datos del clima.');
          setWeatherData(null);
        }
      } catch (err) {
        setError('Error al obtener los datos del clima');
        setWeatherData(null);
        setForecastData([]);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      {/* Input para cambiar ciudad */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa una ciudad"
      />

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
      
      {/* Pronóstico */}
      {forecastData.length > 0 && (
        <div>
          <h3>Pronóstico de los próximos días:</h3>
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
      )}
    </div>
  );
};

export default WeatherApp;
