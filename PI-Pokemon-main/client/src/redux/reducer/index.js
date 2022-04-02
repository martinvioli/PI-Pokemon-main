import { ADD_POKEMON, LOAD_POKEMONS, LOAD_TYPES } from "../actions";

const initialState = {
  pokemons: [],
  types: null,
};

export default function PokemonAPP(state = initialState, action) {
  if (action.type === LOAD_POKEMONS) {
    return { ...state, pokemons: action.payload };
  }
  if (action.type === ADD_POKEMON) {
    return { ...state, pokemons: state.pokemons.concat(action.payload) };
  }
  if (action.type === LOAD_TYPES) {
    return { ...state, types: action.payload };
  }
  return initialState;
}
