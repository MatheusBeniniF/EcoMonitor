const { Leitura } = require("../models");

const getAllLeituras = async (_req, res) => {
  const leituras = await Leitura.findAll();

  res.json(leituras);
};

const getLeituraById = async (req, res) => {
  const leitura = await Leitura.findByPk(req.params.id);
  if (leitura) {
    res.json(leitura);
  } else {
    res.status(404).json({ message: "Leitura não encontrada" });
  }
};

const createLeitura = async (req, res) => {
  const { local, data_hora, tipo, valor } = req.body;

  if (!local || !data_hora || !tipo || valor === undefined) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const leitura = await Leitura.create(req.body);
    res.status(201).json(leitura);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar leitura", error });
  }
};

const updateLeitura = async (req, res) => {
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
};

const deleteLeitura = async (req, res) => {
  const deleted = await Leitura.destroy({
    where: { id: req.params.id },
  });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Leitura não encontrada" });
  }
};

module.exports = {
  getAllLeituras,
  getLeituraById,
  createLeitura,
  updateLeitura,
  deleteLeitura,
};
