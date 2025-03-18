import axios from 'axios';
import { Leitura, LeituraInput } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getLeituras = async (): Promise<Leitura[]> => {
  const { data } = await api.get('/leituras');
  return data;
};

export const getLeitura = async (id: string): Promise<Leitura> => {
  const { data } = await api.get(`/leituras/${id}`);
  return data;
};

export const createLeitura = async (leitura: LeituraInput): Promise<Leitura> => {
  const { data } = await api.post('/leituras', leitura);
  return data;
};

export const updateLeitura = async (id: string, leitura: LeituraInput): Promise<Leitura> => {
  const { data } = await api.put(`/leituras/${id}`, leitura);
  return data;
};

export const deleteLeitura = async (id: string): Promise<void> => {
  await api.delete(`/leituras/${id}`);
};