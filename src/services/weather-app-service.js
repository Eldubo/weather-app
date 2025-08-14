const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Please define VITE_API_KEY in the .env file.");
}

export const fetchWeatherData = async (city) => {
  if (!city) {
    throw new Error("City name is required.");
  }

  const urlClima5Dias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}&units=metric`;

  try {
    const responseClima5Dias = await fetch(urlClima5Dias);

    if (!responseClima5Dias.ok) {
      throw new Error(`Error clima 5 días: ${responseClima5Dias.statusText}`);
    }

    const dataClima5Dias = await responseClima5Dias.json();

    return dataClima5Dias;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(`Error al obtener datos: ${error.message}`);
  }
};
