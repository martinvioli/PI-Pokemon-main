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
      fetch(`http://localhost:3001/pokemons/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetail((pokemonDetail = data)));
    }
    if (name) {
      fetch(`http://localhost:3001/pokemons/?name=${name}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetail((pokemonDetail = data)));
    }
  }, [id, name]);

  return (
    // EXTRAIGO TODA LA DATA DEL FETCH Y LA RENDERIZO. EN CASOD E QUE AUN NO ESTE DISPONIBLE LA DATA, PONGO UN LOADER..
    <>
      <div id="container">
        {pokemonDetail ? (
          <div id="pokeDetailCard">
            <img src={pokemonDetail.Imagen} alt="pokeImg"></img>
            <div id="stats">
              <p>
                ID: <span>{pokemonDetail.ID}</span>
              </p>
              <p>
                NAME: <span>{pokemonDetail.Nombre}</span>
              </p>
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
              <p>
                TYPES: <span>{pokemonDetail.Tipos[0].Nombre}</span>{" "}
                <span>{pokemonDetail.Tipos[1]?.Nombre}</span>
              </p>
              {/* BOTON PARA VOLVER A LA POKEDEX */}
              <Link to="/app/landing">
                <button id="backToPokedex">Back to the pokedex</button>
              </Link>
            </div>
          </div>
        ) : (
          <img
            src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif"
            alt="loader"
          ></img>
        )}
      </div>
    </>
  );
}
