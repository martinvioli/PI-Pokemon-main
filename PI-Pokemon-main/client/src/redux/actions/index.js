export const LOAD_POKEMONS = "LOAD_POKEMONS";
export const ADD_POKEMON = "ADD_POKEMON";
export const LOAD_TYPES = "LOAD_TYPES";

export function loadPokemonsAsync(payload) {
  return (dispatch) => {
    fetch(payload).then((response) =>
      response.json().then((data) => dispatch(loadPokemons(data)))
    );
  };
}

export function loadPokemons(payload) {
  return {
    type: LOAD_POKEMONS,
    payload,
  };
}

export function addPokemon(payload) {
  return {
    type: ADD_POKEMON,
    payload,
  };
}

export function loadTypesAsync(payload) {
  return (dispatch) => {
    fetch(payload).then((response) =>
      response.json().then((data) => dispatch(loadTypes(data)))
    );
  };
}

export function loadTypes(payload) {
  return {
    type: LOAD_TYPES,
    payload,
  };
}
