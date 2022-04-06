import {
  ADD_POKEMON,
  LOAD_POKEMONS,
  LOAD_TYPES,
  SORT_BYNAME,
  SORT_BYSTRENGTH,
  FILTER_KIND,
  FILTER_TYPE,
} from "../actions";

// STATE
const initialState = {
  pokemons: [],
  pokemonsFiltered: [],
  types: null,
};

//FUNCION PARA SORTEAR POR NOMBRE. LUEGO LA USO CON .SORT
function pokemonSorterByName(a, b) {
  if (a.Nombre < b.Nombre) {
    return -1;
  }
  if (a.Nombre > b.Nombre) {
    return 1;
  }
  return 0;
}
//FUNCION PARA SORTEAR POR STR. LUEGO LA USO CON .SORT
function pokemonSorterByStrength(a, b) {
  if (a.Fuerza < b.Fuerza) {
    return -1;
  }
  if (a.Fuerza > b.Fuerza) {
    return 1;
  }
  return 0;
}

// TODOS LOS DISPATCH.
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
  if (action.type === SORT_BYNAME) {
    //CREO COPIAS PORQUE SINO AL CAMBIAR SOLAMENTE EL ORDEN, REACT NO LO RECONOCE COMO CAMBIO Y ENTONCES NO RE-RENDERIZA.
    var arrName = [...state.pokemons];
    var arrFName = [...state.pokemonsFiltered];
    if (action.payload === "AZ") {
      return {
        ...state,
        pokemons: arrName.sort(pokemonSorterByName),
        pokemonsFiltered: arrFName.sort(pokemonSorterByName),
      };
    }
    if (action.payload === "ZA") {
      return {
        ...state,
        pokemons: arrName.sort(pokemonSorterByName).reverse(),
        pokemonsFiltered: arrFName.sort(pokemonSorterByName).reverse(),
      };
    }
  }
  if (action.type === SORT_BYSTRENGTH) {
    //CREO COPIAS PORQUE SINO AL CAMBIAR SOLAMENTE EL ORDEN, REACT NO LO RECONOCE COMO CAMBIO Y ENTONCES NO RE-RENDERIZA.
    var arrStr = [...state.pokemons];
    var arrFStr = [...state.pokemons];
    if (action.payload === "LM") {
      return {
        ...state,
        pokemons: arrStr.sort(pokemonSorterByStrength),
        pokemonsFiltered: arrFStr.sort(pokemonSorterByStrength),
      };
    }
    if (action.payload === "ML") {
      return {
        ...state,
        pokemons: arrStr.sort(pokemonSorterByStrength).reverse(),
        pokemonsFiltered: arrFStr.sort(pokemonSorterByStrength).reverse(),
      };
    }
  }
  if (action.type === FILTER_TYPE) {
    if (action.payload === "default") {
      return {
        ...state,
        pokemonsFiltered: [],
      };
    } else {
      return {
        ...state,
        pokemonsFiltered: state.pokemons.filter(
          (e) =>
            e.Tipos[0].Nombre === action.payload ||
            e.Tipos[1]?.Nombre === action.payload
        ),
      };
    }
  }
  return initialState;
}
