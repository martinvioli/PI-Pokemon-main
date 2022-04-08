import React from "react";
import { Link } from "react-router-dom";

export default function CardMaker(props) {
  function Card(type_of) {
    return (
      props.pokemons
        .filter((e) => typeof e.ID === type_of)
        // EL SLICE VA A IR TAJANDO DE A 12 POKEMONES, GRACIAS AL SHOWPOKES QUE VA SUMANDO O RESTANDO Y DETECTA LOS LIMITES, Y POR CADA POKEMON GENERA UNA CARD CON IMAGEN, NOMBRE, TIPOS, Y BOTON PARA DETALLES.
        .slice(props.showPokes, props.showPokes + 12)
        .map((e) => (
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
              {/* TIPO 0 TIENE SIEMPRE, ENTONCES LO DEJO FIJO. TIPO 1 PUEDE HABER O NO, POR LO QUE ES DINAMICO. */}
              <span>
                <span id={e.Tipos[0].Nombre}>{e.Tipos[0].Nombre}</span>{" "}
                {e.Tipos[1] ? (
                  <span id={e.Tipos[1].Nombre}>{e.Tipos[1].Nombre}</span>
                ) : null}
              </span>
              {e.ID ? (
                // ESTE BOTON AL APRETARLO ME ENVIA A SU RUTA DE DETALLES GENERADA A TRAVES DEL ID Y EL GET AL BACK CON ID.
                <Link to={`/app/pokemondetail/${e.ID}`}>
                  <input
                    className="detailsButton"
                    type="button"
                    value="See details"
                  ></input>
                </Link>
              ) : (
                <input type="button" value="Creating..."></input>
              )}
            </div>
          </div>
        ))
    );
  }

  return (
    <>
      {/* EN CASO DE QUE POR PROPS ME PASE QUE SOLO QUIERE VER LOS CREADOS */}
      {props.filterKind === "created" ? Card("string") : null}
      {/* LO MISMO PERO PARA ORIGINALS */}
      {props.filterKind === "originals" ? Card("number") : null}
      {/* LO MISMO PERO PARA DEFAULT, O SEA PARA VER TODOS. ACA NO USE LA FUNCION PORQUE LA FUNCION TIENE FILTER, Y ACA NO LO NECESITO.*/}
      {props.filterKind === "default"
        ? props.pokemons
            .slice(props.showPokes, props.showPokes + 12)
            .map((e) => (
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
                    <span id={e.Tipos[0].Nombre}>{e.Tipos[0].Nombre}</span>{" "}
                    {e.Tipos[1] ? (
                      <span id={e.Tipos[1].Nombre}>{e.Tipos[1].Nombre}</span>
                    ) : null}
                  </span>
                  {e.ID ? (
                    <Link to={`/app/pokemondetail/${e.ID}`}>
                      <input
                        className="detailsButton"
                        type="button"
                        value="See details"
                      ></input>
                    </Link>
                  ) : (
                    <input
                      className="detailsButton"
                      type="button"
                      value="Creating..."
                    ></input>
                  )}
                </div>
              </div>
            ))
        : null}
    </>
  );
}
