import React, { useEffect } from "react";
import styles from "./styles.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { loadPokemonsAsync } from "../../redux/actions";
import { connect } from "react-redux";

export default function Nav(props) {
  return (
    <>
      <div id="navBar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png"
          alt="pokeballLogo"
        />
        <nav>
          <Link
            to="/app/landing"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Pokemons</span>
          </Link>
          <Link
            to="/app/types"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Types</span>
          </Link>
          <Link
            to="/app/creator"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Creator</span>
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
