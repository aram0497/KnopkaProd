const express = require("express");
const path = require("path");

const { error } = require("console");

const mongoose = require("mongoose");
const Client = require("./models/clientModel");

const app = express();
const port = 3000;

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "img")));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/order", async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res
      .status(200)
      .send(`<p>Спасибо, что оставили заявку! Ожидайте звонка менеджера</p>`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`<p>Ошибка. Попробуйте позже.</p>`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://derajzima:mongoDBknopkaAdmin@cluster0.pbui2b1.mongodb.net/?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
