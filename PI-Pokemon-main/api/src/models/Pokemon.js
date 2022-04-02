const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //DEFINO MODEL DE pokemon
  sequelize.define("Pokemon", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.INTEGER,
    },
    Fuerza: {
      type: DataTypes.INTEGER,
    },
    Defensa: {
      type: DataTypes.INTEGER,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
    },
    Altura: {
      type: DataTypes.INTEGER,
    },
    Peso: {
      type: DataTypes.INTEGER,
    },
  });
};
