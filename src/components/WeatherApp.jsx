import React, { useEffect, useState } from 'react';

export const WeatherApp = () => {
  const {weatherData, setWeatherData} = useContext(resultadoConsultaContext);
  const [error, setError] = useState('');
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {

    const fetchWeather = async () => {
      try {
        const data = await useContext(resultadoConsultaContext);
        
        // Verifica si los datos actuales y el pronóstico fueron recibidos correctamente
        if (weatherData) {
         /* setWeatherData(data.current);
          setError('');

          // Filtra los datos del pronóstico para mostrar uno por día (primer dato de cada día)
          const forecast = data.forecast?.list.filter((item, index, arr) => {
            // Selecciona solo el primer dato de cada día (por ejemplo, a las 12:00)
            return index % 8 === 0;  // Los datos están cada 3 horas, 8 datos = 24 horas (1 día)
          });

          setForecastData(forecast);
          */
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
  }, [resultadoConsultaContext]);
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
