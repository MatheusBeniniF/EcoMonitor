import { Request, Response } from 'express';
import Leitura from '../models/leitura';

export const getLeituras = async (req: Request, res: Response) => {
  try {
    const leituras = await Leitura.findAll();
    res.status(200).json(leituras);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar leituras', error });
  }
};

export const createLeitura = async (req: Request, res: Response) => {
  try {
    const { local, data_hora, tipo, valor } = req.body;
    if (!local || !data_hora || !tipo || !valor) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    const novaLeitura = await Leitura.create({ local, data_hora, tipo, valor });
    res.status(201).json(novaLeitura);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar leitura', error });
  }
};

export const getLeituraById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) {
      return res.status(404).json({ message: 'Leitura não encontrada' });
    }

    return res.status(200).json(leitura);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar leitura', error });
  }
};

export const updateLeitura = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { local, data_hora, tipo, valor } = req.body;

  try {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) {
      return res.status(404).json({ message: 'Leitura não encontrada' });
    }

    if (!local || !data_hora || !tipo || !valor) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    leitura.local = local;
    leitura.data_hora = data_hora;
    leitura.tipo = tipo;
    leitura.valor = valor;

    await leitura.save();

    return res.status(200).json(leitura);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar leitura', error });
  }
};

export const partialUpdateLeitura = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) {
      return res.status(404).json({ message: 'Leitura não encontrada' });
    }

    if (!updates.local && !updates.data_hora && !updates.tipo && !updates.valor) {
      return res.status(400).json({ message: 'Nenhum campo foi atualizado' });
    }

    await leitura.update(updates);

    return res.status(200).json(leitura);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar leitura', error });
  }
};

export const deleteLeitura = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const leitura = await Leitura.findByPk(id);

    if (!leitura) {
      return res.status(404).json({ message: 'Leitura não encontrada' });
    }

    await leitura.destroy();

    return res.status(200).json({ message: 'Leitura deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar leitura', error });
  }
};