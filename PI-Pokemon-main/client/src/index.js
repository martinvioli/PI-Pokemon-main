import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./components/home";
import Landing from "./components/landing";
import { Provider } from "react-redux";
import store from "./redux/store";
import Nav from "./components/nav";
import Creator from "./components/creator";

import Detail from "./components/detail";

//PROVIDER PARA TRAER EL STORE
//ROUTES PARA HACER LAS RUTAS EN SPA
//BRWOSERROUTER PARA ENVOLVER TODOS LOS ROUTES.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<Nav />}>
            <Route path="landing" element={<Landing />} />
            <Route path="creator" element={<Creator />} />
            <Route path="pokemondetail/:id" element={<Detail />} />
            <Route path="pokemondetail/byname/:name" element={<Detail />} />
          </Route>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
