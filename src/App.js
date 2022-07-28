const app = require("express");
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// no fim, iniciamos o serviço na porta 8001
app.listen(8080);
console.log("8080 é a porta mágica!");
