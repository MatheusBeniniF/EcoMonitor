import { Router, Request, Response } from 'express';
import { deleteLeitura, getLeituraById, partialUpdateLeitura, updateLeitura, getLeituras, createLeitura } from '../controllers/leitura';

const router = Router();

// Rota para obter todas as leituras
router.get('/leituras', async (req: Request, res: Response) => {
  try {
    await getLeituras(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para obter leitura por ID
router.get('/leituras/:id', async (req: Request, res: Response) => {
  try {
    await getLeituraById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para criar uma nova leitura
router.post('/leituras', async (req: Request, res: Response) => {
  try {
    await createLeitura(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para atualizar leitura (completa) por ID
router.put('/leituras/:id', async (req: Request, res: Response) => {
  try {
    await updateLeitura(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para atualizar leitura (parcial) por ID
router.patch('/leituras/:id', async (req: Request, res: Response) => {
  try {
    await partialUpdateLeitura(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

// Rota para deletar leitura por ID
router.delete('/leituras/:id', async (req: Request, res: Response) => {
  try {
    await deleteLeitura(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
});

export default router;
