const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const SECRET_KEY = "your_secret_key";
const dbFile = "./db.json";

// Генерація токена
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Зчитуємо дані з файлу
const getUsers = () => {
  const db = JSON.parse(fs.readFileSync(dbFile, "UTF-8"));
  return db.users || [];
};
const getPosts = () => {
  const db = JSON.parse(fs.readFileSync(dbFile, "UTF-8"));
  return db.posts || [];
};

server.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users) || [];
})
server.get("/posts", (req, res) => {
  const posts = getPosts();
  res.json(posts) || [];
})

// Авторизація
server.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      console.error(`Login attempt failed: Invalid email - ${email}`);
      return res.status(401).json({ error: "Invalid email" });
    }

    if (user.password !== password) {
      console.error(`Login attempt failed: Invalid password for email - ${email}`);
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(user);
    return res.json({ token, user });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Перевірка токена
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token required" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    req.user = decoded;
    next();
  });
};

// Захищений маршрут (перевірка токена)
server.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access to protected data", user: req.user });
});

// Використовуємо json-server як middleware
const router = jsonServer.router(dbFile);
server.use("/api", verifyToken, router);

// Запуск сервера
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
