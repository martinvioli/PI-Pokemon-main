export const LOAD_POKEMONS = "LOAD_POKEMONS";
export const ADD_POKEMON = "ADD_POKEMON";
export const LOAD_TYPES = "LOAD_TYPES";
export const SORT_BYNAME = "SORT_BYNAME";
export const SORT_BYSTRENGTH = "SORT_BYSTRENGTH";
export const FILTER_TYPE = "FILTER_TYPE";

// ACTION PARA HACER EL FETCH Y ENVIAR UN RETURN CON EL ACTION CORRECTO
export function loadPokemonsAsync(payload) {
  return (dispatch) => {
    fetch(payload).then((response) =>
      response.json().then((data) => dispatch(loadPokemons(data)))
    );
  };
}

// ACTION "REAL" PARA CARGAR LOS POKES
export function loadPokemons(payload) {
  return {
    type: LOAD_POKEMONS,
    payload,
  };
}

// ACTION PARA AGREGAR POKE
export function addPokemon(payload) {
  return {
    type: ADD_POKEMON,
    payload,
  };
}
// ACTION PARA HACER EL FETCH Y ENVIAR UN RETURN CON EL ACTION CORRECTO
export function loadTypesAsync(payload) {
  return (dispatch) => {
    fetch(payload).then((response) =>
      response.json().then((data) => dispatch(loadTypes(data)))
    );
  };
}

//ACTION PARA CARGAR TYPOS
export function loadTypes(payload) {
  return {
    type: LOAD_TYPES,
    payload,
  };
}

//ACTION PARA SORTEAR POR ALPHABETIC
export function sortByName(payload) {
  return {
    type: SORT_BYNAME,
    payload,
  };
}

//ACTION PARA SORTEAR POR STR
export function sortByStrength(payload) {
  return {
    type: SORT_BYSTRENGTH,
    payload,
  };
}

//ACTION PARA PONER FILTRO DE TYPE
export function filterType(payload) {
  return {
    type: FILTER_TYPE,
    payload,
  };
}
