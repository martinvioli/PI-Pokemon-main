import React from "react";
import { Link } from "react-router-dom";

export default function CardMaker(props) {
  return (
    <>
      {/* EN CASO DE QUE POR PROPS ME PASE QUE SOLO QUIERE VER LOS CREADOS */}
      {props.filterKind === "created"
        ? props.pokemons
            .filter((e) => typeof e.ID === "string")
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
                    {e.Tipos[0].Nombre} {e.Tipos[1] ? e.Tipos[1].Nombre : null}
                  </span>
                  {e.ID ? (
                    // ESTE BOTON AL APRETARLO ME ENVIA A SU RUTA DE DETALLES GENERADA A TRAVES DEL ID Y EL GET AL BACK CON ID.
                    <Link to={`/app/pokemondetail/${e.ID}`}>
                      <input
                        className="detailsButton"
                        type="button"
                        value="Ver detalles"
                      ></input>
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
        : null}
      {/* LO MISMO PERO PARA ORIGINALS */}
      {props.filterKind === "originals"
        ? props.pokemons
            .filter((e) => typeof e.ID === "number")
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
                    {e.Tipos[0].Nombre} {e.Tipos[1] ? e.Tipos[1].Nombre : null}
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
                      type="button"
                      value="Generating details link..."
                    ></input>
                  )}
                </div>
              </div>
            ))
        : null}
      {/* LO MISMO PERO PARA DEFAULT, O SEA PARA VER TODOS. */}
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
                    {e.Tipos[0].Nombre} {e.Tipos[1] ? e.Tipos[1].Nombre : null}
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
                      value="Generating details link..."
                    ></input>
                  )}
                </div>
              </div>
            ))
        : null}
    </>
  );
}
