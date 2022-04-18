import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import {
  filterType,
  loadPokemonsAsync,
  loadTypesAsync,
  sortByName,
  sortByStrength,
} from "../../redux/actions";
import { connect } from "react-redux";
import CardMaker from "./cardMaker";

export function Landing(props) {
  // ESTE USEEFFECT ME VA A CARGAR LOS POKEMONES CADA VEZ QUE ENTRE A LA PAGINA DESDE 0.
  useEffect(
    () => props.loadPokemonsAsync("https://pokemonpimv.herokuapp.com/pokemons"),
    []
  );

  // ESTE USEEFFECT ME VA A CARGAR LOS TIPOS PARA PODER GENERAR EL FILTER DE TYPES, CADA VEZ QUE ENTRE A LA PAGINA DESDE 0.
  useEffect(
    () => props.loadTypesAsync("https://pokemonpimv.herokuapp.com/types"),
    []
  );

  // SHOWPOKES VA A SER MI VALOR DINAMICO QUE VOY A USAR DE REFERENCIA PARA IR MOSTRANDO DE A 12 POKEMONES CADA PAGINA.
  var [showPokes, setShowPokes] = useState(0);
  // FILTERKIND ME SIRVE PARA DETERMINAR CUALES POKEMONES (CREADOS O ORIGINALES O TODOS) MOSTRAR. LO VOY A PASAR LUEGO COMO PROP AL CARDMAKER. CADA VEZ QUE CAMBIO EL FILTRO, SE SETEA UN NUEVO ESTADO DE FILTERKIND Y POR LO TANTO SE VUELVE A RENDERIZAR CARDMAKER CON LA PROP ACTUALIZADA.
  var [filterKind, setFilterKind] = useState("default");

  //PAGINATORADD Y LESS SON LAS FUNCIONES QUE CREE PARA IR PAGINANDO. CADA UNA SE UTILIZA EN UN BOTON DE NEXT Y PREV PAGE. LA FUNCION AUMENTA O RESTA (DEPENDIENDO DE LA CANTIDAD TOTAL DE ELEMENTOS EN EL ARRAY DE POKEMONES) EL VALOR DE SHOWPOKE. EN CASO DE ESTAR EN LA "ULTIMA" PAGINA, NO AUMENTA MAS, Y EN CASO DE ESTAR EN LA "PRIMER" NO RESTA MAS.
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
      {/* SI POKEMONS (ESTADO DEL STORE EN EL CUAL GUARDO EL LLAMADO AL BACKEND CON TODOS LOS POKEMONES) AUN NO CARGO, RENDERIZO UN LOADER. SI YA TIENE MAS DE 0 ELEMENTOS, PROCEDO A RENDERIZAR LO FALTANTE. */}
      {props.pokemons.length > 0 ? (
        // SI LOS POKEMONS YA CARGARON, RENDERIZO LOS FILTERS EN LA PARTE SUPERIOR DE LA PAGINA.
        // ESTOS FILTROS FUERON CREADOS DE MANERA QUE PUEDA UTILIZAR LOS 4 AL MISMO TIEMPO SI DESEARA.
        <div id="filters">
          <div className="filter">
            <label htmlFor="Types">Filter by type: </label>
            <select
              defaultValue="default"
              name="Types"
              // CUANDO CAMBIO LA OPCION SELECCIONADA, SHOWPOKES SE REINICIA A 0 (PARA NO MOSTRAR PAGINAS INVISIBLES EN CASO DE QUE EL PAGINADO ESTUVIESE MODIFICADO EN ESE MOMENTO), Y ADEMAS EJECUTO UN DISPATCH DE FILTERTYPE, PARA CREAR UN POKEMONSFILTERED PARALELO EN EL STORE, QUE CUMPLA CON EL FILTRO SOLICITADO.
              onChange={(e) => {
                setShowPokes((showPokes = 0));
                props.filterType(e.target.value);
              }}
            >
              <option value="default">ALL</option>
              {props.types
                ? props.types.map((e) => (
                    // PARA EL DISPATCH UTILIZO EL VALUE, QUE ES EL NOMBRE DEL TYPE.
                    <option value={e.Nombre} key={e.ID}>
                      {e.Nombre}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="Kinds">Filter by kind: </label>
            <select
              defaultValue="default"
              name="Kinds"
              // ESTE SERIA EL FILTER SEGUN ORIGINALES, CREADOS O TODOS. PARA ESTE FILTRO EN VEZ DE GENERAR OTRA RAMA EN EL STORE, FILTRO DIRECTAMENTE SOBRE LOS POKEMONES TRAIDOS, Y USOEL STATE FILTERKIND QUE ELABORE ANTES. SEGUN CADA VALUE QUE SELECCIONE, EN LA ETAPA DE RENDERING DE CARDMAKER FILTRO LOS POKE QUE QUIERO VER.
              onChange={(e) => {
                setShowPokes((showPokes = 0));
                setFilterKind((filterKind = e.target.value));
              }}
            >
              <option value="default">ALL</option>
              <option value="originals">ORIGINALS</option>
              <option value="created">CREATED</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="Alphabetic">Sort by name: </label>
            <select
              defaultValue="default"
              name="Alphabetic"
              // PARA ESTE FILTRO UTILIZO UN DISPATCH AL CUAL LE INDICO SI QUIERO AZ O ZA, Y ACTUA SOBRE EL MISMO STATE DE POKEMONS DEL STORE.
              onChange={(e) => {
                setShowPokes((showPokes = 0));
                props.sortByName(e.target.value);
              }}
            >
              <option value="default" disabled={true}>
                SELECT SORTING...
              </option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="Strength">Sort by strength: </label>
            <select
              defaultValue="default"
              name="Strength"
              // ESTE FILTRO ES COMO EL DE ALPHABETIC TAMBIEN.
              onChange={(e) => {
                setShowPokes((showPokes = 0));
                props.sortByStrength(e.target.value);
              }}
            >
              <option value="default" disabled={true}>
                SELECT SORTING...
              </option>
              <option value="LM">LESS TO MORE</option>
              <option value="ML">MORE TO LESS</option>
            </select>
          </div>
        </div>
      ) : null}
      {/* ETAPA DE CARDS */}
      <div id="cards">
        {props.pokemons.length > 0 ? (
          // SI POKEMONS (RAMA PRINCIPAL) ES MAYOR A 0, RENDERIZO CON POKEMONS. SI DETECTO QUE POKEMONES FILTERED ES MAYOR A CERO, RENDERIZO CON POKEMONSFILTERED YA QUE ESTOY UTILIZANDO UN FILTRO DE TIPO.
          props.pokemonsFiltered.length > 0 ? (
            <>
              {/* ESTE ES EL CARDMAKER PARA POKEMONSFILTERED. */}
              <CardMaker
                pokemons={props.pokemonsFiltered}
                showPokes={showPokes}
                // ADEMAS LE PASO LA PROP PARA QUE RENDERICE POR KIND.
                filterKind={filterKind}
              />
              {props.pokemonsFiltered.length > 12 ? (
                // ESTO ES PARA DETECTAR CUANTOS POKEMONES HAY ANTES Y DESPUES DE LA PAGINA QUE ESTOY PARADO. DE ESTA MANERA, SI ES POSIBLE IR A LA PROXIMA PAGINA O A LA ANTERIOR, HABILITO EL BOTON, SINO LO DESHABILITO CON DISABLED.
                <div id="buttons">
                  {showPokes !== 0 ? (
                    <button onClick={() => paginatorLess()}>Prev page</button>
                  ) : (
                    <button onClick={() => paginatorLess()} disabled={true}>
                      Prev page
                    </button>
                  )}
                  {showPokes + 12 < props.pokemonsFiltered.length ? (
                    <button onClick={() => paginatorAdd()}>Next page</button>
                  ) : (
                    <button onClick={() => paginatorAdd()} disabled={true}>
                      Next page
                    </button>
                  )}
                </div>
              ) : // Y EN CASO DE QUE NO HAYA PAGINAS (O SEA 0 POKEMONES ENCONTRADOS), NO RENDERIZO LOS BOTONES.
              null}
            </>
          ) : (
            <>
              {/* ESTE ES EL CARD MAKER PARA POKEMONS. SE REPITE LO MISMO QUE EL ANTERIOR PERO CON POKEMONS. */}
              <CardMaker
                pokemons={props.pokemons}
                showPokes={showPokes}
                filterKind={filterKind}
              />
              {props.pokemons.length > 12 ? (
                <div id="buttons">
                  {showPokes !== 0 ? (
                    <button onClick={() => paginatorLess()}>Prev page</button>
                  ) : (
                    <button onClick={() => paginatorLess()} disabled={true}>
                      Prev page
                    </button>
                  )}
                  {showPokes + 12 < props.pokemons.length ? (
                    <button onClick={() => paginatorAdd()}>Next page</button>
                  ) : (
                    <button onClick={() => paginatorAdd()} disabled={true}>
                      Next page
                    </button>
                  )}
                </div>
              ) : null}
            </>
          )
        ) : (
          <div id="loader">
            <img
              src="https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif"
              alt="loader"
            ></img>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
}

// SECTOR DE REDUX

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    pokemonsFiltered: state.pokemonsFiltered,
    types: state.types,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPokemonsAsync: (url) => dispatch(loadPokemonsAsync(url)),
    loadTypesAsync: (link) => dispatch(loadTypesAsync(link)),
    sortByName: (sort) => dispatch(sortByName(sort)),
    sortByStrength: (sort) => dispatch(sortByStrength(sort)),
    filterType: (type) => dispatch(filterType(type)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
