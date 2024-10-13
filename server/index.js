// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
