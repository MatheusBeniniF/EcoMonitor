const request = require("supertest");
const app = require("../app");
const { Leitura, sequelize } = require("../models");

process.env.NODE_ENV = "test";

const leituraMock = {
  local: "São Paulo",
  data_hora: "2025-03-19T15:42:12.654Z",
  tipo: "Temperatura",
  valor: 22.5,
};

const route = "/api/leituras";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /leituras", () => {
  it("deve retornar uma lista vazia de leituras", async () => {
    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("deve retornar uma lista de leituras", async () => {
    await Leitura.create(leituraMock);

    const response = await request(app).get(route);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].local).toBe(leituraMock.local);
  });
});

describe("POST /leituras", () => {
  it("deve criar uma nova leitura", async () => {
    const response = await request(app).post(route).send(leituraMock);

    expect(response.status).toBe(201);
    expect(response.body.local).toBe(leituraMock.local);
    expect(response.body.tipo).toBe(leituraMock.tipo);
  });

  it("deve retornar erro ao criar uma leitura com dados inválidos", async () => {
    const response = await request(app).post(route).send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Todos os campos são obrigatórios");
  });
});

describe("PUT /leituras/:id", () => {
  it("deve atualizar uma leitura existente", async () => {
    const leitura = await Leitura.create(leituraMock);

    const updatedData = { local: "Rio de Janeiro", valor: 25.0 };
    const response = await request(app)
      .put(`${route}/${leitura.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.local).toBe(updatedData.local);
    expect(response.body.valor).toBe(updatedData.valor);
  });

  it("deve retornar erro ao tentar atualizar uma leitura inexistente", async () => {
    const response = await request(app)
      .put(`${route}/999`)
      .send({ local: "Rio de Janeiro" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Leitura não encontrada");
  });
});

describe("DELETE /leituras/:id", () => {
  it("deve deletar uma leitura existente", async () => {
    const leitura = await Leitura.create(leituraMock);

    const response = await request(app).delete(`${route}/${leitura.id}`);
    expect(response.status).toBe(204);

    const leituraDeletada = await Leitura.findByPk(leitura.id);
    expect(leituraDeletada).toBeNull();
  });

  it("deve retornar erro ao tentar deletar uma leitura inexistente", async () => {
    const response = await request(app).delete(`${route}/999`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Leitura não encontrada");
  });
});
