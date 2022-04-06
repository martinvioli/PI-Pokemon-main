import React from "react";
import styles from "./styles.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <body id="selector">
        <div id="topPB">Ingresar</div>
        <img
          id="pikachuRunner"
          src="https://c.tenor.com/tQVZsHnTSZgAAAAi/pikachu.gif"
          alt="pikachuLoader"
        ></img>
        <div id="button">
          {/* AL APRETAR EL BOTON EL REACT ROUTER ME MANDA A APP/LANDING */}
          <Link
            to="/app/landing"
            style={{ textDecoration: "none", color: "black" }}
          >
            GO!
          </Link>
        </div>
        <h3 id="credits">INDIVIDUAL PROJECT MADE BY M.V. 🚀</h3>
      </body>
    </>
  );
}
