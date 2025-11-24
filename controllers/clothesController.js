const Clothes = require("../models/Clothes");

module.exports = {
    async create(req, res) {
        try {
            const { descricao, tamanho, estado, imagem } = req.body;

            const roupa = await Clothes.create({
                descricao,
                tamanho,
                estado,
                imagem,
                userId: req.user.id
            });

            res.status(201).json(roupa);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao cadastrar roupa" });
        }
    },

    async list(req, res) {
        try {
            const roupas = await Clothes.findAll();
            res.json(roupas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar roupas" });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;

            const roupa = await Clothes.findByPk(id);

            if (!roupa) return res.status(404).json({ error: "Roupa não encontrada" });

            await roupa.update(req.body);

            res.json({ message: "Atualizado com sucesso", roupa });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao atualizar roupa" });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const roupa = await Clothes.findByPk(id);
            if (!roupa) return res.status(404).json({ error: "Roupa não encontrada" });

            await roupa.destroy();
            res.json({ message: "Removido com sucesso" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao remover roupa" });
        }
    }
};
