import React, { useState } from "react";
import styles from "./styles.css";
import { Link, Outlet } from "react-router-dom";

export default function Nav(props) {
  //MI STATE SEARCHQUERY ME SIRVE PARA TENER UNA INPUT CONTROLADA. CUANDO LE DE AL BOTON DE GO!, VA A HACER UN LINK AL POKEMONDETAIL CON EL VALOR DE LA SEARCHQUERY.
  var [searchQuery, setSearchQuery] = useState();

  return (
    <>
      <div id="navBar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
          alt="pokeballLogo"
        />
        <nav>
          {/* LOS LINKS CON STYLE INLINE PROPIO */}
          <Link
            to="/app/landing"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className="hoverPage">POKEMONS</span>
          </Link>
          <Link
            to="/app/creator"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className="hoverPage">CREATOR</span>
          </Link>
        </nav>
        {/* EL INPUT CONTROLADO */}
        <div id="input">
          <input
            type="text"
            placeholder="Search a pokemon by name..."
            onChange={(e) => setSearchQuery((searchQuery = e.target.value))}
            value={searchQuery}
          ></input>
          <Link to={`/app/pokemondetail/byname/${searchQuery}`}>
            <button id="goButton">GO!</button>
          </Link>
        </div>
      </div>
      {/* OUTLET ES EL NUEVO SISTEMA QUE USA REACT ROUTER V6 PARA SETEAR UN COMPONENTE COMO LAYOUT PARA ESTABLECER EN TODAS LAS PAGINAS QUE DESEE QUE ESTE. */}
      <Outlet />
    </>
  );
}
