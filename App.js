const express = require("express");
const app = express();
const port = 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
http.listen(port, () => console.log(`Example app listening on port ${port}!`));
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
