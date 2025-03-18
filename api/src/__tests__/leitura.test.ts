import request from 'supertest';
import app from '../server';

describe('Leitura API', () => {
  // Testa a rota GET /leituras
  it('deve retornar todas as leituras', async () => {
    const response = await request(app).get('/api/leituras');
    expect(response.status).toBe(200); // Espera que o status seja 200
    expect(Array.isArray(response.body)).toBe(true); // Espera que a resposta seja um array
  });

  // Testa a rota GET /leituras/:id
  it('deve retornar uma leitura por ID', async () => {
    // Supondo que você tenha um ID válido na sua base de dados
    const validId = 1; 

    const response = await request(app).get(`/api/leituras/${validId}`);
    expect(response.status).toBe(200); // Espera que o status seja 200
    expect(response.body.id).toBe(validId); // Espera que o ID seja o mesmo que foi passado
  });

  // Testa a rota PUT /leituras/:id
  it('deve atualizar uma leitura existente', async () => {
    const validId = 1; // ID válido para atualizar
    const updatedLeitura = {
      local: 'Novo Local',
      data_hora: '2025-03-17T10:00:00',
      tipo: 'Novo Tipo',
      valor: 123.45,
    };

    const response = await request(app)
      .put(`/api/leituras/${validId}`)
      .send(updatedLeitura);
    expect(response.status).toBe(200); // Espera que o status seja 200
    expect(response.body.local).toBe(updatedLeitura.local); // Espera que o campo 'local' tenha sido atualizado
  });

  // Testa a rota PATCH /leituras/:id (atualização parcial)
  it('deve atualizar parcialmente uma leitura', async () => {
    const validId = 1; // ID válido para atualização parcial
    const partialUpdate = {
      valor: 567.89,
    };

    const response = await request(app)
      .patch(`/api/leituras/${validId}`)
      .send(partialUpdate);
    expect(response.status).toBe(200); // Espera que o status seja 200
    expect(response.body.valor).toBe(partialUpdate.valor); // Espera que o campo 'valor' tenha sido atualizado
  });

  // Testa a rota DELETE /leituras/:id
  it('deve deletar uma leitura', async () => {
    const validId = 1; // ID válido para deletar

    const response = await request(app).delete(`/api/leituras/${validId}`);
    expect(response.status).toBe(200); // Espera que o status seja 200
    expect(response.body.message).toBe('Leitura deletada com sucesso'); // Espera que a mensagem de sucesso seja a esperada
  });

  // Testa a rota GET /leituras/:id com ID inválido
  it('deve retornar erro 404 ao buscar uma leitura com ID inválido', async () => {
    const invalidId = 99999; // ID inexistente

    const response = await request(app).get(`/api/leituras/${invalidId}`);
    expect(response.status).toBe(404); // Espera que o status seja 404
    expect(response.body.message).toBe('Leitura não encontrada'); // Espera que a mensagem de erro seja a esperada
  });

  // Testa a rota PUT /leituras/:id com dados inválidos
  it('deve retornar erro 400 ao tentar atualizar uma leitura com dados inválidos', async () => {
    const validId = 1;
    const invalidLeitura = {
      local: '', // Campo local vazio, inválido
      data_hora: '2025-03-17T10:00:00',
      tipo: 'Novo Tipo',
      valor: 123.45,
    };

    const response = await request(app)
      .put(`/api/leituras/${validId}`)
      .send(invalidLeitura);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Todos os campos são obrigatórios');
  });
});
