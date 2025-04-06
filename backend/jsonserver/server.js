const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { request } = require("http");
const { log } = require("console");

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

// Отримання користувачів
server.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users) || [];
})

// Отримання постів
server.get("/posts", (req, res) => {
  const posts = getPosts();
  res.json(posts) || [];
})

// Реєстрація користувачів
server.post("/users/register", (req, res) => {  
  const { first_name, last_name, email, password, bio, id, profile_picture_letter} = req.body;

  // Перевірка, чи всі дані надані
  if (!first_name || !last_name || !email || !password || !id || !profile_picture_letter) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Перевірка на унікальність email
  const users = getUsers();
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: "Email already in use." });
  }

  const newUser = {
    id,
    first_name,
    last_name,
    email,
    password,
    bio,
    profile_picture_letter,
    subscribers: [],
  };

  // Додавання нового користувача до бази
  const db = JSON.parse(fs.readFileSync(dbFile, "UTF-8"));
  db.users.push(newUser);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

  return res.status(201).json({ message: "User registered successfully", user: newUser });
});


// Отримання Користувача
server.post("/users", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User are required." });
  }

  try {
    const users = getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      console.error(`Fetch failed: Invalid user => ${user}`);
      return res.status(401).json({ error: "Invalid user id" });
    }

    return res.json({ message: "You have access to data", user: user });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
})

// Підписка на користувача
server.patch("/users/:id/subscribe", (req, res) => {
  const { id } = req.params;
  const { subscriberId } = req.body;

  try {
    const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    const users = db.users || [];

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found." });
    }

    const currentSubscribers = users[userIndex].subscribers || [];
    if (!currentSubscribers.includes(subscriberId)) {
      currentSubscribers.push(subscriberId);
    }

    users[userIndex].subscribers = currentSubscribers;

    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

    return res.status(200).json({
      message: `User ${subscriberId} subscribed to ${id}`,
      user: users[userIndex]
    });
  } catch (err) {
    console.error("Error subscribing user:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Відписка від користувача
server.patch("/users/:id/unsubscribe", (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;

  if (!currentUserId || !id) {
    return res.status(400).json({ error: "Both user IDs are required." });
  }

  try {
    const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    const users = db.users;

    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found." });
    }

    targetUser.subscribers = targetUser.subscribers.filter(
      (subscriberId) => subscriberId !== currentUserId
    );

    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
    return res.status(200).json({
      message: "Unsubscribed successfully",
      userId: id,
      updatedSubscribers: targetUser.subscribers,
    });
  } catch (err) {
    console.error("Error during unsubscribe:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// запит на пости які є у юзера
server.post("/posts/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "userId is required." });
  }

  try {
    const posts = getPosts();
    const userPosts = posts.filter(post => post.userId === userId);

    return res.status(200).json(userPosts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// видалення постів
server.delete("/posts/:postId", (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "postId is required." });
  }

  try {
    const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    const posts = db.posts || [];

    // Знаходимо пост, який видаляємо
    const postToDelete = posts.find((post) => post.id === postId);

    if (!postToDelete) {
      return res.status(404).json({ error: "Post not found." });
    }

    const { userId } = postToDelete;

    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Видаляємо пост
    const updatedPosts = posts.filter((post) => post.id !== postId);
    db.posts = updatedPosts;

    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

    // Отримуємо оновлені пости цього юзера
    const userPosts = updatedPosts.filter((post) => post.userId === userId);

    return res.status(200).json({
      message: "Post deleted successfully.",
      userId,
      data: userPosts,
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Створення поста
server.post("/posts", (req, res) => {
  const posts = getPosts();
  const { userId, id, content, img } = req.body;

  if (!userId || !id || !content) {
    return res.status(400).json({ error: "userId, id, and content are required." });
  }

  const newPost = { userId, id, content, img: img || "" };

  posts.push(newPost);

  try {
    // Зчитуємо повну базу
    const db = JSON.parse(fs.readFileSync(dbFile, "UTF-8"));
    db.posts = posts;

    // Перезаписуємо файл із оновленими постами
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

    return res.status(201).json(newPost);
  } catch (err) {
    console.error("Error writing to database:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

//  Авторизація
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
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({ error: "User are required." });
  }

  try {
    const users = getUsers();
    const user = users.find((u) => u.id === id);

    if (!user) {
      console.error(`Fetch failed: Invalid user - ${user}`);
      return res.status(401).json({ error: "Invalid user id" });
    }

    res.json({ message: "You have access to data", user: user });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Використовуємо json-server як middleware
const router = jsonServer.router(dbFile);
server.use("/api", verifyToken, router);

// Запуск сервера
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
