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

  //Regexp para admitir solo letras y espacios
  const [regexpNombre, setRegExpNom] = useState(/^[a-zA-Z\s]+$/);
  //Regexp para admitir solo numeros del 1 al 99 inclusive.
  const [regexpNumeros, setRegExpNum] = useState(/^(99|[1-9][0-9]?)$/);

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
    <>
      <form onSubmit={(event) => handleSumbit(event)}>
        <label htmlFor="Nombre">Nombre del pokemon:</label>
        <input
          type="text"
          name="Nombre"
          value={state.Nombre}
          onChange={(e) =>
            setState({ ...state, Nombre: e.target.value.toString() })
          }
        ></input>
        <span>Solo letras y espacios. No se admiten simbolos ni numeros.</span>
        <label htmlFor="Vida">Vida:</label>
        <input
          type="number"
          max="100"
          name="Vida"
          value={state.Vida}
          onChange={(e) =>
            // LE HAGO TOSTRING() A CADA NUMERO PARA QUE EL REGEXP FUNCIONE CORRECTAMENTE Y DETECTE SIMBOLOS.
            setState({ ...state, Vida: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Fuerza">Fuerza:</label>
        <input
          type="number"
          name="Fuerza"
          value={state.Fuerza}
          onChange={(e) =>
            setState({ ...state, Fuerza: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Defensa">Defensa:</label>
        <input
          type="number"
          name="Defensa"
          value={state.Defensa}
          onChange={(e) =>
            setState({ ...state, Defensa: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Velocidad">Velocidad:</label>
        <input
          type="number"
          name="Velocidad"
          value={state.Velocidad}
          onChange={(e) =>
            setState({ ...state, Velocidad: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Altura">Altura:</label>
        <input
          type="number"
          name="Altura"
          value={state.Altura}
          onChange={(e) =>
            setState({ ...state, Altura: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Peso">Peso:</label>
        <input
          type="number"
          name="Peso"
          value={state.Peso}
          onChange={(e) =>
            setState({ ...state, Peso: e.target.value.toString() })
          }
        ></input>
        <span>Solo numeros del 1 al 99</span>
        <label htmlFor="Tipos">Tipos:</label>
        <select
          defaultValue="default"
          name="Tipos"
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
              props.types ? "Elige un tipo..." : "Cargando tipos..."
            }
          </option>
          {props.types
            ? props.types.map((e) => (
                // En value guardo en forma de string los datos de cada tipo, con nombre y ID para luego poder hacer tanto el post como el refresh del state.
                <option value={`{"ID":"${e.ID}","Nombre":"${e.Nombre}"}`}>
                  {e.Nombre}
                </option>
              ))
            : null}
        </select>
        <select
          defaultValue="default"
          name="Tipos"
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
              props.types ? "Elige un tipo..." : "Cargando tipos..."
            }
          </option>
          <option value="null">Sin tipo 2.</option>
          {props.types
            ? props.types.map((e) => (
                // En value guardo en forma de string los datos de cada tipo, con nombre y ID para luego poder hacer tanto el post como el refresh del state.
                <option value={`{"ID":"${e.ID}","Nombre":"${e.Nombre}"}`}>
                  {e.Nombre}
                </option>
              ))
            : null}
        </select>
        <span>Debes elegir al menos 1 tipo.</span>
        {
          // Verifico que todos los input esten almenos completados, includo el primer tipo el cual es OBLIGATORIO.
          Object.values(state)
            .slice(0, 7)
            .every((e) => e) && state.Tipos[0] ? (
            // Luego verifico que esten BIEN completados, es decir, cumplan con los REGEX.
            regexpNombre.test(state.Nombre) &&
            Object.values(state)
              .slice(1, 7)
              .map((e) => regexpNumeros.test(e))
              .every((e) => e) ? (
              // Si todo esta OK, habilito el boton de sumbit.
              <input type="submit" value="Agregar pokemon!"></input>
            ) : (
              // Si mi regex detecta errores, no habilito el boton de sumbit hasta que el usuario los arregle.
              <p>Completa correctamente todos los campos porfavor!.</p>
            )
          ) : // Si faltan completar campos no renderizo el boton de sumbit porque asumo que el usuario aun esta completando los campos.
          null
        }
      </form>
    </>
  );
}

function mapStateToProps(state) {
  return {
    types: state.types,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadTypesAsync: (link) => dispatch(loadTypesAsync(link)),
    addPokemon: (pokemon) => dispatch(addPokemon(pokemon)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
