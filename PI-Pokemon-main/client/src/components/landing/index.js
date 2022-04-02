import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import { Link } from "react-router-dom";
import { loadPokemonsAsync } from "../../redux/actions";
import { connect } from "react-redux";

export function Landing(props) {
  useEffect(
    () => props.loadPokemonsAsync("http://localhost:3001/pokemons"),
    []
  );

  var [showPokes, setShowPokes] = useState(0);

  function paginatorAdd() {
    if (showPokes + 12 < props.pokemons.length) {
      setShowPokes((showPokes += +12));
      return;
    } else {
      return;
    }
  }

  function paginatorLess() {
    if (showPokes !== 0) {
      setShowPokes((showPokes -= 12));
      return;
    } else {
      return;
    }
  }

  return (
    <>
      <div id="cards">
        {props.pokemons.length > 0 ? (
          props.pokemons.slice(showPokes, showPokes + 12).map((e) => (
            <div className="card">
              {e.Imagen ? (
                <img src={e.Imagen} alt="cardImg" />
              ) : (
                <img
                  src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
                  alt="cardImg"
                />
              )}
              <div>
                <span>{e.Nombre}</span>
                <span>
                  {e.Tipos[0].Nombre} {e.Tipos[1] ? e.Tipos[1].Nombre : null}
                </span>
                {e.ID ? (
                  <Link to={`/app/pokemondetail/${e.ID}`}>
                    <input type="button" value="Ver detalles"></input>
                  </Link>
                ) : (
                  <input
                    type="button"
                    value="Generando link de detalles..."
                  ></input>
                )}
              </div>
            </div>
          ))
        ) : (
          <div id="loader"></div>
        )}
      </div>
      {props.pokemons.length > 12 ? (
        <div id="buttons">
          <button onClick={() => paginatorLess()}>Prev page</button>
          <button onClick={() => paginatorAdd()}>Next page</button>
        </div>
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPokemonsAsync: (url) => dispatch(loadPokemonsAsync(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
