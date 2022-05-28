import express from "express";
import http from "http";
import WebSocket from "ws";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {res.render("home")});
app.get("/*", (req, res) => {res.redirect("/")});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];
const messages = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["name"] = "Anon";
    console.log(socket);
    socket.on("close", () => {
        console.log("disconnected");
    });

    socket.on("message", (message) => {
        let msg = JSON.parse(message);
        switch (msg.type) {
            case "msg" : 
                messages.push(`${socket.name} : ${msg.payload}`);
                sockets.forEach(aSocket => {
                    if (aSocket != socket) {
                        aSocket.send(`${socket.name} : ${msg.payload}`);
                    }                 
                });
                console.log(messages);
                break;
            case "name" : 
                socket["name"] = msg.payload;
                break;
        };
    });
});


const handleListen = () => {console.log("hi")};

server.listen(3000, handleListen);


