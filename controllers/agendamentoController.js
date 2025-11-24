const Agendamento = require("../models/Agendamento");

module.exports = {
    async create(req, res) {
        try {
            const { data, hora, observacao } = req.body;

            const agendamento = await Agendamento.create({
                data,
                hora,
                observacao,
                userId: req.user.id
            });

            res.status(201).json(agendamento);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao criar agendamento" });
        }
    },

    async list(req, res) {
        try {
            const lista = await Agendamento.findAll();
            res.json(lista);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar agendamentos" });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const agendamento = await Agendamento.findByPk(id);
            if (!agendamento)
                return res.status(404).json({ error: "Agendamento não encontrado" });

            await agendamento.destroy();
            res.json({ message: "Agendamento removido" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao remover agendamento" });
        }
    }
};
