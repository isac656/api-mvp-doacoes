const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const tokenValue = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded; // contém id e tipo
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};
