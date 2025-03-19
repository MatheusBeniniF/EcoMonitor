const express = require("express");
const router = express.Router();
const {
  getAllLeituras,
  getLeituraById,
  createLeitura,
  updateLeitura,
  deleteLeitura,
} = require("../controllers/leitura");

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
router.get("/", getAllLeituras);

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
router.get("/:id", getLeituraById);

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
router.post("/", createLeitura);

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
router.put("/:id", updateLeitura);

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
router.delete("/:id", deleteLeitura);

module.exports = router;
