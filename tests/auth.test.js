const request = require("supertest");
const app = require("../server"); // se exportar o app no server.js

describe("Teste de Registro", () => {
  it("Deve registrar usuário", async () => {
    const res = await request(app).post("/api/auth/register").send({
      nome: "Teste",
      email: "teste"+Date.now()+"@gmail.com",
      senha: "123",
      tipo: "doador"
    });
    expect(res.status).toBe(201);
  });
});
