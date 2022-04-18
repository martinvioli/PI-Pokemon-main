import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Detail(props) {
  //ME EXTRAIGO ID Y NAME DE LOS PARAM QUE ME MANDO POR LA RUTA.
  let { id, name } = useParams();

  //EN POKEMONDETAIL ME GUARDO LA DATA QUE ME TRAE POR LLAMADO EL FETCH A MI BACKEND.
  let [pokemonDetail, setPokemonDetail] = useState();

  //EL FETCH LO HACE NI BIEN SE CARGA LA PAGINA DE DETALLES, CON EL ID O NOMBRE PROVEIDO. Y ADEMAS, EN EL USEEFFECT LE DIGO QUE ESTE ATENTO A ID Y NAME, YA QUE DE ESTA MANERA, SI ANTERIORMENTE ENTRE VIA ID, Y LUEGO ENTRO VIA NOMBRE, DETECTE QUE UNO DE LOS 2 PARAMS SE CAMBIO, Y RENDERIZE SEGUN EL QUE SE ESTA USANDO.
  useEffect(() => {
    if (id) {
      fetch(`https://pokemonpimv.herokuapp.com/pokemons/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetail((pokemonDetail = data)));
    }
    if (name) {
      fetch(`https://pokemonpimv.herokuapp.com/pokemons/?name=${name}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetail((pokemonDetail = data)));
    }
  }, [id, name]);

  return (
    // EXTRAIGO TODA LA DATA DEL FETCH Y LA RENDERIZO. EN CASOD E QUE AUN NO ESTE DISPONIBLE LA DATA, PONGO UN LOADER..
    <>
      <div id="container">
        {pokemonDetail ? (
          // PREGUNTO SI ME LLEGO ERROR O ME LLEGO LA DATA CORRECTA
          !pokemonDetail.hasOwnProperty("Error") ? (
            <div id="pokeDetailCard">
              <p>{pokemonDetail.Nombre}</p>
              <div id="pokeDetailCardStats">
                <img src={pokemonDetail.Imagen} alt="pokeImg"></img>
                <div id="stats">
                  <p>
                    ID: <span>{pokemonDetail.ID}</span>
                  </p>
                  <hr></hr>
                  <p>
                    HP: <span>{pokemonDetail.Vida}</span>
                  </p>
                  <p>
                    STRENGTH: <span>{pokemonDetail.Fuerza}</span>
                  </p>
                  <p>
                    DEFFENSE: <span>{pokemonDetail.Defensa}</span>
                  </p>
                  <p>
                    SPEED: <span>{pokemonDetail.Velocidad}</span>
                  </p>
                  <p>
                    HEIGHT: <span>{pokemonDetail.Altura}</span>
                  </p>
                  <p>
                    WEIGHT: <span>{pokemonDetail.Peso}</span>
                  </p>
                  <hr></hr>
                  <p>
                    TYPES:{" "}
                    <span id={pokemonDetail.Tipos[0].Nombre}>
                      {pokemonDetail.Tipos[0].Nombre}
                    </span>{" "}
                    <span id={pokemonDetail.Tipos[1]?.Nombre}>
                      {pokemonDetail.Tipos[1]?.Nombre}
                    </span>
                  </p>
                </div>
              </div>
              {/* BOTON PARA VOLVER A LA POKEDEX */}
              <Link to="/app/landing">
                <button id="backToPokedex">BACK TO POKEDEX</button>
              </Link>
            </div>
          ) : (
            // PANTALLA POR SI ME LLEGO ERROR
            <div id="notFoundScreen">
              <section>
                <h1>Oops!... That Pokemon isn't captured yet.</h1>
                <h4>Try searching for another.</h4>
                <Link to="/app/landing">
                  <button id="backToPokedex">Back to the pokedex</button>
                </Link>
              </section>
              <section>
                <img
                  src="https://media1.giphy.com/media/VdWNHBgPnDudA5F3MM/giphy.gif?cid=6c09b952e1y5i7qiv9yk9g5ijgo1anc0a496g370ogthqwxi&rid=giphy.gif&ct=s"
                  alt="sadPsyduck"
                ></img>
              </section>
            </div>
          )
        ) : (
          <>
            <img
              src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif"
              alt="loader"
            ></img>
          </>
        )}
      </div>
    </>
  );
}
