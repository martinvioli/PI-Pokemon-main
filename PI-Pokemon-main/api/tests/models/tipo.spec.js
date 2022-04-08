const { Tipo, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Tipo model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    describe("Nombre", () => {
      it("Deberia arrojar un error si se intenta ingresar un nombre NO string", (done) => {
        Tipo.create({ Nombre: 5 })
          .then(() => done(new Error("El nombre debe ser un string")))
          .catch(() => done());
      });
      it("Deberia funcionar correctamente si se ingresa un string", () => {
        Tipo.create({ Nombre: "Metal" });
      });
      it("No deberia admitir un ID (PK) string", () => {
        Tipo.create({ ID: "IdCustom", Nombre: "Metal" })
          .then(() => done(new Error("No se debe proveer un ID string")))
          .catch(() => done());
      });
    });
  });
});
