const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Chat server is running here!");
});
app.get("/message", (req, res) => {
  res.send(messagesList);
});

app.post("/message", (req, res) => {
  if (
    req.body.from === "" ||
    req.body.text === "" ||
    req.body.from === undefined ||
    req.body.text === undefined
  ) {
    res.sendStatus(400);
  } else {
    const id = messagesList.length;
    let messageTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    const newMessage = { ...req.body, id, messageTime };
    messagesList.push(newMessage);
    res.send(messagesList);
  }
});
app.put("/message", (req, res) => {
  const id = req.query.id;
  let messageToUpdate = messagesList.find(message => {
    return message.id === Number(id);
  });

  const result = {...messageToUpdate, ...req.body }

//   messageToUpdate.from = req.body.from;
//   messageToUpdate.text = req.body.text;
//   console.log(messageToUpdate);
  //   const messagesList[updatedMessage] = req.body;
  res.send(result);
});
app.get("/message/:id", (req, res) => {
  console.log(typeof req.params.id);

  const searchMessage = messagesList.filter(
    message => message.id === Number(req.params.id)
  );
  console.log(searchMessage);

  res.send(searchMessage);
});
app.delete("/message/:id", (req, res) => {
  const deleteMessage = messagesList.findIndex(message => {
    return message.id === Number(req.params.id);
  });
  console.log(deleteMessage);
  messagesList.splice(deleteMessage, 1);
  res.send("Deleted message of ID" + req.params.id);
});

let messagesList = [
  { id: 0, from: "Ali", text: "Hello" },
  { id: 1, from: "Youssef", text: "I want to sleep" },
  { id: 2, from: "Yosra", text: "I am hungry" },
  { id: 3, from: "Meriem", text: "I need help" },
  { id: 4, from: "Loic", text: "Well done" }
];
app.listen(process.env.Port || 3004, () => {
  console.log("App chat server");
});
