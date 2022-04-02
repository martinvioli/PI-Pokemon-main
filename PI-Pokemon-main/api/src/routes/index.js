const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// infoCleaner FUNCTION (Para evitar traerme todas las otras cosas de la api que no voy a usar)
function InfoCleaner(data, array) {
  var { name, id, height, weight, sprites, stats, types } = data;
  array.push({
    ID: id,
    Nombre: name,
    Vida: stats[0].base_stat,
    Fuerza: stats[1].base_stat,
    Defensa: stats[2].base_stat,
    Velocidad: stats[5].base_stat,
    Altura: height,
    Peso: weight,
    Tipos: [
      { Nombre: types[0].type.name },
      types[1] ? { Nombre: types[1]?.type.name } : null,
    ],
    Imagen: sprites.other.home.front_default,
  });
}

router.get("/pokemons/:id", async function (req, res) {
  var pokeID = req.params.id;
  // Si pokeID es un numero y es mayor que 0 (ya que el primer ID en pokeapi es 1)
  if (pokeID > 0) {
    try {
      var arrayClean = [];
      var dataAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${Number(pokeID)}/`
      );
      var dataAPIdata = await dataAPI.data;
      await InfoCleaner(dataAPIdata, arrayClean);
      res.send(arrayClean);
    } catch (error) {
      // En caso de que no exista ese ID en pokeapi
      res.send("Pokemon inexistente!");
    }
    // Si pokeID no es un numero (la sentencia superior daria false y por lo tanto entra en este else)
  } else {
    try {
      // hago findOne para usar el UUID generado y NO el id usado para conectar tablas.
      var ownDB = await Pokemon.findOne({
        where: { ID: pokeID },
        include: {
          model: Tipo,
          as: "Tipos",
          attributes: ["Nombre"],
          // ESTO ES PARA QUE NO ME TRAIGA TAMBIEN LA INFO DE LA TABLA THROUGH Y NO ESTORBE..
          through: {
            attributes: [],
          },
        },
      });
      res.send(ownDB);
    } catch (error) {
      // En caso de que no exista esa ID en mi db
      res.send("Pokemon inexistente!");
    }
  }
});

router.get("/pokemons", async function (req, res) {
  //USO EL MISMO GET PARA QUERY Y NO-QUERY.
  if (req.query.name) {
    var Nombre = req.query.name;
    try {
      var arrayClean = [];
      var dataAPI = await axios.get(
        // LO LLEVO A MINUSCULAS PARA QUE EL USUARIO PUEDA BUSCAR EN MAYUS O MINUS, PERO EN POKEAPI BUSCA SI O SI EN MINUSCULA
        `https://pokeapi.co/api/v2/pokemon/${Nombre.toLowerCase()}/`
      );
      var dataAPIdata = await dataAPI.data;
      await InfoCleaner(dataAPIdata, arrayClean);
      res.send(arrayClean);
    } catch (error) {
      var ownDB = await Pokemon.findOne({
        // LO LLEVO A MAYUSCULA PARA USAR MI ESTANDAR PERO QUE EL USUARIO PUEDA BUSCAR EN MAYUS O MINUS.
        where: { Nombre: Nombre.toUpperCase() },
        include: {
          model: Tipo,
          as: "Tipos",
          attributes: ["Nombre"],
          // ESTO ES PARA QUE NO ME TRAIGA TAMBIEN LA INFO DE LA TABLA THROUGH Y NO ESTORBE..
          through: {
            attributes: [],
          },
        },
      });
      // SI ENCUENTRA EN LA DB LO MANDA
      if (ownDB !== null) {
        res.send(ownDB);
      }
      // SI NO ENCUENTRA EN LA DB NI EN LA POKEAPI, ENVIA ERROR.
      res.send("No existe ese pokemon!.");
    }
  } else {
    // Array donde voy a guardar los poke de la api con mi funcion
    var arrayClean = [];
    // API FETCH //
    // bucle for para ir del 1 al 40 (y que vaya guardando la data ordenadamente con push)
    for (var i = 1; i <= 40; i++) {
      var dataAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      var dataAPIdata = await dataAPI.data;
      await InfoCleaner(dataAPIdata, arrayClean);
    }
    // DB FETCH //
    var ownDB = await Pokemon.findAll({
      include: {
        model: Tipo,
        as: "Tipos",
        attributes: ["Nombre"],
        // ESTO ES PARA QUE NO ME TRAIGA TAMBIEN LA INFO DE LA TABLA THROUGH Y NO ESTORBE..
        through: {
          attributes: [],
        },
      },
    });
    // SEND de ambas juntas
    res.send(arrayClean.concat(ownDB));
  }
});

router.post("/pokemons", async function (req, res) {
  var { Nombre, Vida, Fuerza, Defensa, Velocidad, Altura, Peso, Tipos } =
    req.body;

  var typesDB = await Tipo.findByPk(Tipos[0].ID);

  if (Tipos[1]) {
    var typesDB2 = await Tipo.findByPk(Tipos[1].ID);
  }

  if (Nombre) {
    const newPoke = await Pokemon.create({
      // NOMBRE Y TIPOS EN MAYUSCULAS PARA GENERAR UN ESTANDAR PARA LA BUSQUEDA Y QUE EL USUARIO PUEDA BUSCAR TANTO EN MAYUSCULA COMO EN MINUSCULA O EN MEZCLA.
      Nombre: Nombre.toUpperCase(),
      Vida,
      Fuerza,
      Defensa,
      Velocidad,
      Altura,
      Peso,
    });
    await newPoke.addTipos(typesDB);
    await newPoke.addTipos(typesDB2);
    res.send(`Pokemon generado exitosamente. ID asignado: ${newPoke.ID}`);
  } else {
    res.send("El nombre es obligatorio!");
  }
});

router.get("/types", async function (req, res) {
  // bucle for hasta 18 inclusive para iterar en todos los tipos existentes (no incluye los ultimos 2 [???, shadow])
  for (var i = 1; i <= 18; i++) {
    // fetch a la api por cada tipo y en el mismo orden que figuran en la api.
    var dataAPI = await axios.get(`https://pokeapi.co/api/v2/type/${i}/`);
    var dataAPIdata = await dataAPI.data;
    var { id, name } = await dataAPIdata;
    // destructuring y crear registro de cada clase en mi DB
    const newType = await Tipo.findOrCreate({
      where: {
        ID: id,
        Nombre: name.toUpperCase(),
      },
    });
  }
  // una vez que termino el bucle, consulto la tabla entera de Tipo y la muestro.
  const ownDB = await Tipo.findAll();
  res.send(ownDB);
});

module.exports = router;
