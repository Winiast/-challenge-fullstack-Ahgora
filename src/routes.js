const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static(__dirname + "/view"));

router.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.use("/", router);
app.listen(process.env.port || 8080);

console.log("server rodando");
