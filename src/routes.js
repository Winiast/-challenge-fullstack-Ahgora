const express = require("express");
const app = express();
const port = 8080;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// app.get()

app.listen(port, () => {
  console.log(`Server rodando na porta http://localhost:${port}`);
});
