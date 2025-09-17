import React, { useContext, useEffect } from "react";
import { ResultadoProvider } from "./context/resultadoConsultaContext";
import { ModoProvider, colorPantallaContext } from "./context/colorPantallaContext";
import InputCity from "./components/InputCity";
import Next24HoursForecast from "./components/Next24HoursForecast";
import Next5DaysForecast from "./components/Next5DaysForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import ModoPantalla from "./components/ModoPantalla";
import "./App.css";
import "./styles/weather-info.css";

function AppContent() {
  const { colorPantalla } = useContext(colorPantallaContext);

  // 👉 Sin tocar CSS: seteamos fondos correctos en DOM al cambiar el tema
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const app = document.querySelector(".App");
  
    // 1) limpiar clases de tema
    html.classList.remove("dark-theme", "light-theme");
    body.classList.remove("dark-theme", "light-theme");
  
    // 2) aplicar la clase correcta (esto hace que tu CSS de tema funcione)
    const theme = colorPantalla === "dark" ? "dark-theme" : "light-theme";
    html.classList.add(theme);
    body.classList.add(theme);
  
    // 3) limpiar estilos inline que metimos antes (evita que pisen al CSS)
    ["background", "overflowX"].forEach((prop) => {
      html.style[prop] = "";
      body.style[prop] = "";
    });
    if (root) root.style.background = "";
    if (app) app.style.background = "";
  
    // 4) opcional: evitar mordidas horizontales
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
  }, [colorPantalla]);
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>Clima en la Ciudad</h1>
        <ModoPantalla />
      </header>

      <InputCity />
      <CurrentWeather />
      <Next24HoursForecast />
      <Next5DaysForecast />
    </div>
  );
}

export default function App() {
  return (
    <ModoProvider>
      <ResultadoProvider>
        <AppContent />
      </ResultadoProvider>
    </ModoProvider>
  );
}