import React from "react";
import styles from "./styles.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <body id="selector">
      <div id="text">
        <h1>WELCOME TO THE POKEDEX</h1>
        <h3>
          Here you will find all your captured pokemons with every detail you
          need.
        </h3>
        <p>Click on the pokeball below to enter.</p>
      </div>
      <div id="pokeBall">
        <img id="topPB" src="https://i.imgur.com/mUbK715.png" alt=""></img>
        <Link id="go" to="/app/landing" style={{ textDecoration: "none" }}>
          GO!
        </Link>
        <img id="botPB" src="https://i.imgur.com/w6C5NP1.png" alt=""></img>
      </div>
      <h3 id="credits">INDIVIDUAL PROJECT MADE BY M.V. 🚀</h3>
    </body>
  );
}
