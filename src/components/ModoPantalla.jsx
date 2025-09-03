import React, { useContext } from "react";
import { colorPantallaContext } from "../context/colorPantallaContext";
import Sun from "../assets/images/Sun.png";
import Moon from "../assets/images/Moon.png";

const ModoPantalla = () => {
  const { colorPantalla, setColorPantalla } = useContext(colorPantallaContext);

  const cambiarPantallaModo = () => {
    setColorPantalla(colorPantalla === "dark" ? "light" : "dark");
  };

  return (
    <button className="pantallaModo" onClick={cambiarPantallaModo}>
      {colorPantalla === "dark" ? (
        <img src={Sun} alt="Modo claro" />
      ) : (
        <img src={Moon} alt="Modo oscuro" />
      )}
    </button>
  );
};
export default ModoPantalla;