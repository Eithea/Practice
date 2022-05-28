const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nameForm = document.querySelector("#name");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    return JSON.stringify({type, payload});
};


socket.addEventListener("open", () => {
    console.log("connected");
});

socket.addEventListener("close", () => {
    console.log("disconnected");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});


messageForm.addEventListener("submit", handleSubmit);
nameForm.addEventListener("submit", handleNameSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("msg", input.value));

    const li = document.createElement("li");
    li.innerText = `Me : ${input.value}`;
    messageList.append(li);

    input.value = "";
};

function handleNameSubmit(event) {
    event.preventDefault();
    const input = nameForm.querySelector("input");
    socket.send(makeMessage("name", input.value));
};