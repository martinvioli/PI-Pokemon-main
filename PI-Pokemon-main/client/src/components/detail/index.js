import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import { useParams } from "react-router-dom";

export default function Detail(props) {
  let { id } = useParams();

  let [pokemonDetail, setPokemonDetail] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemonDetail((pokemonDetail = data)));
  }, []);

  console.log(pokemonDetail);

  return (
    <>
      {pokemonDetail ? (
        <div id="pokeDetailCard">
          <img src={pokemonDetail.Imagen} alt="pokeImg"></img>
          <p>ID: {pokemonDetail.ID}</p>
          <p>NOMBRE: {pokemonDetail.Nombre}</p>
          <p>VIDA: {pokemonDetail.Vida}</p>
          <p>FUERZA: {pokemonDetail.Fuerza}</p>
          <p>DEFENSA: {pokemonDetail.Defensa}</p>
          <p>VELOCIDAD: {pokemonDetail.Velocidad}</p>
          <p>ALTURA: {pokemonDetail.Altura}</p>
          <p>PESO: {pokemonDetail.Peso}</p>
          <p>
            TIPOS: {pokemonDetail.Tipos[0].Nombre}{" "}
            {pokemonDetail.Tipos[1]?.Nombre}
          </p>
        </div>
      ) : (
        <p>Cargando pokemon</p>
      )}
    </>
  );
}
