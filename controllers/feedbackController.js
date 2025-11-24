const Feedback = require("../models/Feedback");

module.exports = {
  async create(req, res) {
    try {
      const fb = await Feedback.create({
        ...req.body,
        userId: req.user.id
      });
      res.json(fb);
    } catch (err) {
      res.status(500).json({ error: "Erro ao enviar feedback" });
    }
  },

  async list(req, res) {
    try {
      const list = await Feedback.findAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: "Erro ao listar feedbacks" });
    }
  }
};
