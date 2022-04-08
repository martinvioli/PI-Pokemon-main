/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);

describe("GET a Pokemons por ID", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("GET /pokemons/:id", () => {
    it("Deberia responder 200 si se ingresa un id valido", () =>
      agent.get("/pokemons/1").expect(200));
    it("Deberia responder 404 si se ingresa un id invalido", () =>
      agent.get("/pokemons/notAPokemon").expect(404));
  });
});
