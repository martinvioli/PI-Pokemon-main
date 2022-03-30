const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("tipo", {
    //COMO LA DATA LA OBTENGO DE POKEAPI, NO NECESITO GENERAR UN AUTOINCREMENTABLE PARA EL ID. PUES NECESITO EXACTAMENTE EL MISMO ID DE CADA TIPO QUE EN POKEAPI.
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
  });
};
