
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/postRoutes");

const { apiLimiter, authLimiter } = require("./middleware/rateLimiter");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(apiLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running successfully" });
});

module.exports = app;
