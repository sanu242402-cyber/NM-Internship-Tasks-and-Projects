const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let idCounter = 1;

// ROOT
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// GET users
app.get("/users", (req, res) => {
  res.json(users);
});

// ADD user (EMAIL OPTIONAL)
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // name mandatory check
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  users.push({
    id: idCounter++,
    name: name,
    email: email ? email : ""   // 👈 email optional
  });

  res.json({ message: "User added successfully" });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json({ message: "User updated successfully" });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
