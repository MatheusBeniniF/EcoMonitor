const express = require("express");
const router = express.Router();
const { Leitura } = require("../models");

/**
 * @swagger
 * /leituras:
 *   get:
 *     summary: Retorna todas as leituras
 *     parameters:
 *       - in: query
 *         name: local
 *         schema:
 *           type: string
 *         description: Filtro por local
 *     responses:
 *       200:
 *         description: Lista de leituras
 */
router.get("/", async (req, res) => {
  const { local } = req.query;
  const where = local ? { local } : {};
  const leituras = await Leitura.findAll({ where });
  res.json(leituras);
});

/**
 * @swagger
 * /leituras/{id}:
 *   get:
 *     summary: Retorna uma leitura específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da leitura
 *     responses:
 *       200:
 *         description: Leitura encontrada
 *       404:
 *         description: Leitura não encontrada
 */
router.get("/:id", async (req, res) => {
  const leitura = await Leitura.findByPk(req.params.id);
  if (leitura) {
    res.json(leitura);
  } else {
    res.status(404).json({ message: "Leitura não encontrada" });
  }
});

/**
 * @swagger
 * /leituras:
 *   post:
 *     summary: Cria uma nova leitura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               local:
 *                 type: string
 *               data_hora:
 *                 type: string
 *                 format: date-time
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       201:
 *         description: Leitura criada
 *       400:
 *         description: Erro ao criar leitura
 */
router.post("/", async (req, res) => {
  try {
    const leitura = await Leitura.create(req.body);
    res.status(201).json(leitura);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar leitura", error });
  }
});

/**
 * @swagger
 * /leituras/{id}:
 *   put:
 *     summary: Atualiza uma leitura existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da leitura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               local:
 *                 type: string
 *               data_hora:
 *                 type: string
 *                 format: date-time
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Leitura atualizada
 *       404:
 *         description: Leitura não encontrada
 *       400:
 *         description: Erro ao atualizar leitura
 */
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Leitura.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLeitura = await Leitura.findByPk(req.params.id);
      res.status(200).json(updatedLeitura);
    } else {
      res.status(404).json({ message: "Leitura não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar leitura", error });
  }
});

/**
 * @swagger
 * /leituras/{id}:
 *   delete:
 *     summary: Deleta uma leitura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da leitura
 *     responses:
 *       204:
 *         description: Leitura deletada
 *       404:
 *         description: Leitura não encontrada
 */
router.delete("/:id", async (req, res) => {
  const deleted = await Leitura.destroy({
    where: { id: req.params.id },
  });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Leitura não encontrada" });
  }
});

module.exports = router;
