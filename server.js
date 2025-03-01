require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins for testing
});

app.use(cors());
app.get("/", (req, res) => res.send("WebSocket Server is Running!"));

io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);
  
    socket.on("message", (msg) => {
      console.log("📥 Received on server:", msg); // ✅ Debugging: Is the server receiving messages?
      io.emit("message", msg); // ✅ Broadcast to all clients
    });
  
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`WebSocket Server running on port ${PORT}`));
