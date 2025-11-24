const Instituicao = require("../models/Instituicao");

module.exports = {
  async create(req, res) {
    try {
      if (req.user.tipo !== "admin") {
        return res.status(403).json({ error: "Apenas administradores" });
      }

      const inst = await Instituicao.create(req.body);
      res.json(inst);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar instituição" });
    }
  },

  async list(req, res) {
    try {
      const list = await Instituicao.findAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar instituições" });
    }
  }
};
