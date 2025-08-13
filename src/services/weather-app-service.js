const apiKey = process.env.PERENUAL_API_KEY;

export const fetchWeatherData = async(city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url)
    if (!response){
        throw new Error ("La ciudad buscada no se encontro o hubo un error en la Api Key")
    }
    
    return await response.json();
}