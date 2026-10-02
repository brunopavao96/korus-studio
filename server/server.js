const express = require("express");
const db = require("./database");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(".."));

app.get("/api", (req, res) => {
    res.json({
        massage: "Kórus Studio API funcionando!"
    })
})

app.post("/api/users", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Nome, e-mail e senha são obrigatórios."
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const statement = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);

        const result = statement.run(name, email, passwordHash);

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            userId: result.lastInsertRowid
        });

    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                message: "Este e-mail já está cadastrado."
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Erro ao criar usuário."
        });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "E-mail e senha são obrigatórios."
        });
    }

    try {
        const user = db.prepare(`
            SELECT id, name, email, password
            FROM users
            WHERE email = ?
        `).get(email);

        if (!user) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos."
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "E-mail ou senha inválidos."
            });
        }

        res.json({
            message: "Login realizado com sucesso!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao realizar login."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Kórus rodando em https://localhost:${PORT}`);
})