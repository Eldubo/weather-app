const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCitySuggestions = async (query) => {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return [];
  }

  if (!apiKey) {
    throw new Error("API key is missing. Please define VITE_API_KEY in the .env file.");
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(normalizedQuery)}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error al buscar ciudades: ${response.statusText}`);
    }

    const data = await response.json();

    return Array.isArray(data)
      ? data.map((city) => ({
          name: city.name,
          country: city.country,
          state: city.state,
          lat: city.lat,
          lon: city.lon,
          label: [city.name, city.state, city.country].filter(Boolean).join(", "),
        }))
      : [];
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    throw new Error(`No se pudieron cargar las sugerencias: ${error?.message || "desconocido"}`);
  }
};

export const fetchWeatherData = async (city) => {
  const normalizedCity = city?.trim();

  if (!normalizedCity) {
    throw new Error("City name is required.");
  }

  if (!apiKey) {
    throw new Error("API key is missing. Please define VITE_API_KEY in the .env file.");
  }

  const urlClima5Dias = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(normalizedCity)}&cnt=40&appid=${apiKey}&units=metric`;

  try {
    const responseClima5Dias = await fetch(urlClima5Dias);

    if (!responseClima5Dias.ok) {
      const errorText = await responseClima5Dias.text();
      throw new Error(errorText || `Error al buscar la ciudad: ${responseClima5Dias.statusText}`);
    }

    const dataClima5Dias = await responseClima5Dias.json();
    return dataClima5Dias;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(`Error al obtener datos: ${error?.message || "desconocido"}`);
  }
};
