import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./styles.css";
import { addPokemon, loadTypesAsync } from "../../redux/actions";

export function Creator(props) {
  // Cargo los tipos ni bien renderizo la pagina.
  useEffect(() => props.loadTypesAsync("http://localhost:3001/types"), []);

  // Creo el state que me va a servir para: cargar la DB, y cargar el fake.
  const [state, setState] = useState({
    Nombre: null,
    Vida: null,
    Fuerza: null,
    Defensa: null,
    Velocidad: null,
    Altura: null,
    Peso: null,
    Tipos: [],
  });

  // Estado para avisar si se creo el pokemon y poder visualizar una alerta de creacion exitosa.
  let [completed, setCompleted] = useState(false);

  //Regexp para admitir solo letras y espacios
  const [regexpNombre] = useState(/^[a-zA-Z\s]+$/);
  //Regexp para admitir solo numeros del 1 al 99 inclusive.
  const [regexpNumeros] = useState(/^(99|[1-9][0-9]?)$/);

  function addToDB() {
    fetch("http://localhost:3001/pokemons", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      // lo paso a JSON para que se procese correctamente y se cargue a la DB...
      body: JSON.stringify(state),
    });
  }

  function handleSumbit(event) {
    //Para evitar el refresh y no tener que volver a cargar todos los Pokemons en landing
    event.preventDefault();
    //Para agregarlo a la DB
    addToDB();
    //Un falso agregado, para no tener que refreshear la pagina para que el landing reconozca el nuevo pokemon.
    props.addPokemon(state);
  }

  return (
    <div className="container">
      {
        // Verifico que la pokedex este cargada. Sino, obligo al usuario a cargarla, ya que es necesaria para luego crear y detectarlos correctamente.
        props.pokemons.length > 0 ? (
          <form onSubmit={(event) => handleSumbit(event)}>
            <label htmlFor="Name">Pokemon Name:</label>
            <input
              type="text"
              name="Name"
              value={state.Nombre}
              onChange={(e) =>
                setState({
                  ...state,
                  Nombre: e.target.value.toString().toUpperCase(),
                })
              }
            ></input>
            {/* VERIFICADOR PARA SABER SI EL NOMBRE YA ESTA EN USO */}
            {props.pokemons.every(
              (e) => e.Nombre.toUpperCase() != state.Nombre?.toUpperCase()
            ) ? null : (
              <span className="alertText">This name is already in use.</span>
            )}
            <span className="conditionText">
              Only letters and spaces are allowed here. No numbers and no
              symbols.
            </span>
            <label htmlFor="HP">HP:</label>
            <input
              type="number"
              max="100"
              name="HP"
              value={state.Vida}
              onChange={(e) =>
                // LE HAGO TOSTRING() A CADA NUMERO PARA QUE EL REGEXP FUNCIONE CORRECTAMENTE Y DETECTE SIMBOLOS.
                setState({ ...state, Vida: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Strength">Strength:</label>
            <input
              type="number"
              name="Strength"
              value={state.Fuerza}
              onChange={(e) =>
                setState({ ...state, Fuerza: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Deffense">Deffense:</label>
            <input
              type="number"
              name="Deffense"
              value={state.Defensa}
              onChange={(e) =>
                setState({ ...state, Defensa: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Speed">Speed:</label>
            <input
              type="number"
              name="Speed"
              value={state.Velocidad}
              onChange={(e) =>
                setState({ ...state, Velocidad: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Height">Height:</label>
            <input
              type="number"
              name="Height"
              value={state.Altura}
              onChange={(e) =>
                setState({ ...state, Altura: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Weight">Weight:</label>
            <input
              type="number"
              name="Weight"
              value={state.Peso}
              onChange={(e) =>
                setState({ ...state, Peso: e.target.value.toString() })
              }
            ></input>
            <span className="conditionText">
              Only numbers from 1 to 99 inclusive.
            </span>
            <label htmlFor="Types">Types:</label>
            <select
              defaultValue="default"
              name="Types"
              onChange={(e) =>
                setState({
                  ...state,
                  // Hago un parse para transformar el string a objeto
                  Tipos: [JSON.parse(e.target.value), state.Tipos[1]],
                })
              }
            >
              <option disabled={true} value="default">
                {
                  // RENDERIZO UNA OPCION INELEGIBLE Y DEFAULT QUE ME SIRVE TANTO PARA CUANDO CARGAN LOS TIPOS, COMO PARA CUANDO OBLIGO AL USUARIO A ELEGIR UNO.
                  props.types ? "Choose a type..." : "Loading types..."
                }
              </option>
              {props.types
                ? props.types.map((e) => (
                    // En value guardo en forma de string los datos de cada tipo, con nombre y ID para luego poder hacer tanto el post como el refresh del state.
                    <option
                      key={e.ID}
                      value={`{"ID":"${e.ID}","Nombre":"${e.Nombre}"}`}
                    >
                      {e.Nombre}
                    </option>
                  ))
                : null}
            </select>
            {state.Tipos[0] ? (
              <select
                defaultValue="default"
                name="Types"
                onChange={(e) =>
                  setState({
                    ...state,
                    // Hago un parse para transformar el string a objeto
                    Tipos: [state.Tipos[0], JSON.parse(e.target.value)],
                  })
                }
              >
                <option disabled={true} value="default">
                  {
                    // RENDERIZO UNA OPCION INELEGIBLE Y DEFAULT QUE ME SIRVE TANTO PARA CUANDO CARGAN LOS TIPOS, COMO PARA CUANDO OBLIGO AL USUARIO A ELEGIR UNO. EN ESTE CASO AL SER TIPO 2 TAMBIEN GENERO UNA OPCION DE SIN TIPO 2 POR SI EL USUARIO SE ARREPIENTE Y NO QUIERE 2DO TIPO.
                    props.types ? "Choose another type..." : "Loading types..."
                  }
                </option>
                <option value="null">NO SECOND TYPE.</option>
                {props.types
                  ? props.types
                      //FILTRO PARA QUE ME SAQUE DE LAS OPCIONES AL TIPO QUE ELIGIO EL USUARIO EN TIPO[0], YA QUE UN POKEMON NO PUEDE TENER 2 TIPOS IGUALES.
                      .filter((x) => x.Nombre !== state.Tipos[0].Nombre)
                      .map((e) => (
                        // En value guardo en forma de string los datos de cada tipo, con nombre y ID para luego poder hacer tanto el post como el refresh del state.
                        <option
                          key={e.ID}
                          value={`{"ID":"${e.ID}","Nombre":"${e.Nombre}"}`}
                        >
                          {e.Nombre}
                        </option>
                      ))
                  : null}
              </select>
            ) : null}
            <span className="conditionText">
              You must choose at least one type.
            </span>
            {
              // Verifico que todos los input esten almenos completados, includo el primer tipo el cual es OBLIGATORIO.
              Object.values(state)
                .slice(0, 7)
                .every((e) => e) && state.Tipos[0] ? (
                // Primero verifico que no exista otro pokemon con ese nombre (mayus y minus indistintas)
                props.pokemons.every((e) => e.Nombre != state.Nombre) &&
                // Luego verifico que esten BIEN completados, es decir, cumplan con los REGEX.
                regexpNombre.test(state.Nombre) &&
                Object.values(state)
                  .slice(1, 7)
                  .map((e) => regexpNumeros.test(e))
                  .every((e) => e) ? (
                  // Si todo esta OK, habilito el boton de sumbit.
                  <input
                    type="submit"
                    value="ADD POKEMON!"
                    onClick={() => {
                      setCompleted((completed = true));
                      setTimeout(() => setCompleted((completed = false)), 2000);
                    }}
                  ></input>
                ) : (
                  // Si mi regex detecta errores, no habilito el boton de sumbit hasta que el usuario los arregle.
                  <p className="alertText">
                    Please, complete all the inputs correctly!.
                  </p>
                )
              ) : // Si faltan completar campos no renderizo el boton de sumbit porque asumo que el usuario aun esta completando los campos.
              null
            }
            {completed ? (
              <p>The new Pokemon was added succesfully. Congratulations!.</p>
            ) : null}
          </form>
        ) : (
          <h1>
            {" "}
            ERROR: Before creating a new Pokemon, you must load the Pokedex!.
          </h1>
        )
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    types: state.types,
    pokemons: state.pokemons,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadTypesAsync: (link) => dispatch(loadTypesAsync(link)),
    addPokemon: (pokemon) => dispatch(addPokemon(pokemon)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
