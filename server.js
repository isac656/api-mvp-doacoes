require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("API funcionando corretamente!");
});

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/clothes", require("./routes/clothingRoutes")); // apenas se já existir
app.use("/institutions", require("./routes/institutionRoutes")); // apenas se existir
app.use("/agendamento", require("./routes/agendamentoRoutes")); // apenas se existir

// Start server and connect database
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log("🟢 Conexão com MySQL bem-sucedida!");

        // Cria tabelas se não existirem
        sequelize.sync({ alter: true }).then(() => {
            console.log("🟢 Tabelas sincronizadas com o banco de dados.");
        });

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log("👉 Teste agora em: http://localhost:" + PORT);
        });
    })
    .catch((err) => {
        console.error("🔴 Erro ao conectar ao MySQL:", err);
    });
