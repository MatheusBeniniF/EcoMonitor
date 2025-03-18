// src/swagger/leituraSwagger.ts

/**
 * @swagger
 * /leituras:
 *   get:
 *     summary: Obtém todas as leituras
 *     responses:
 *       200:
 *         description: Lista de todas as leituras
 *       500:
 *         description: Erro interno ao buscar leituras
 */

/**
 * @swagger
 * /leituras/{id}:
 *   get:
 *     summary: Obtém uma leitura pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da leitura
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leitura encontrada
 *       404:
 *         description: Leitura não encontrada
 *       500:
 *         description: Erro interno ao buscar leitura
 */

/**
 * @swagger
 * /leituras/{id}:
 *   put:
 *     summary: Atualiza uma leitura (completa) pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da leitura
 *         required: true
 *         schema:
 *           type: integer
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
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Leitura atualizada com sucesso
 *       404:
 *         description: Leitura não encontrada
 *       500:
 *         description: Erro interno ao atualizar leitura
 */

/**
 * @swagger
 * /leituras/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma leitura pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da leitura
 *         required: true
 *         schema:
 *           type: integer
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
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Leitura parcialmente atualizada com sucesso
 *       404:
 *         description: Leitura não encontrada
 *       500:
 *         description: Erro interno ao atualizar leitura
 */


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
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       201: 
 *         description: Leitura criada com sucesso
 *       404:
 *         description: Erro ao criar leitura
 *       500:
 *          description: Erro interno ao criar leitura
 */

/**
 * @swagger
 * /leituras/{id}:
 *   delete:
 *     summary: Deleta uma leitura pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da leitura
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leitura deletada com sucesso
 *       404:
 *         description: Leitura não encontrada
 *       500:
 *         description: Erro interno ao deletar leitura
 */
