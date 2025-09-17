import React, { useContext, useEffect } from "react";
import { ResultadoProvider } from "./context/resultadoConsultaContext";
import { ModoProvider, colorPantallaContext } from "./context/colorPantallaContext";
import InputCity from "./components/InputCity";
import Next24HoursForecast from "./components/Next24HoursForecast";
import Next5DaysForecast from "./components/Next5DaysForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import ModoPantalla from "./components/ModoPantalla";
import "./App.css";

function AppContent() {
  const { colorPantalla } = useContext(colorPantallaContext);

  useEffect(() => {
    const clsDark = "dark-theme";
    const clsLight = "light-theme";
    document.body.classList.remove(clsDark, clsLight);
    document.body.classList.add(colorPantalla === "dark" ? clsDark : clsLight);
  }, [colorPantalla]);  

  return (
    <div className={`App ${colorPantalla === "dark" ? "dark-theme" : "light-theme"}`}>
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

function App() {
  return (
    <ResultadoProvider>
      <ModoProvider>
        <AppContent />
      </ModoProvider>
    </ResultadoProvider>
  );
}

export default App;
