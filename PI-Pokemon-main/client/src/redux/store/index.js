import { createStore, applyMiddleware } from "redux";
import PokemonAPP from "../reducer";
import thunk from "redux-thunk";

// STORE PARA POKEMONAPP, CON MW THUNK PARA HACER DISPATCHS ASINCRONICOS
const store = createStore(PokemonAPP, applyMiddleware(thunk));

export default store;
