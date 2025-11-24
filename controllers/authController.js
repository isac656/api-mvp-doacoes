const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, senha, tipo } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ error: "Email já cadastrado" });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(senha, salt);

      const user = await User.create({
        nome,
        email,
        senha: hash,
        tipo
      });

      res.status(201).json({ message: "Usuário criado com sucesso!", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const valid = bcrypt.compareSync(senha, user.senha);
      if (!valid) return res.status(400).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id, tipo: user.tipo },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ message: "Login bem-sucedido!", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
};
