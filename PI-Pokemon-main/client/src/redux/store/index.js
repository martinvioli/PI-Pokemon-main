import { createStore, applyMiddleware } from "redux";
import PokemonAPP from "../reducer";
import thunk from "redux-thunk";

const store = createStore(PokemonAPP, applyMiddleware(thunk));

export default store;
