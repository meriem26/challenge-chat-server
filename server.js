const moment = require("moment");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chatchat",
  password: "password",
  port: 5454
});

app.get("/message", function(req, res) {
  pool
    .query("SELECT * FROM chat ORDER BY id LIMIT 10")
    .then(result => res.json(result.rows))
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    });
});
app.post("/message", function(req, res) {
  const from = req.body.from;
  const text = req.body.text;

  if (!from || !text) {
    res.sendStatus(400);
  } else {
    pool
      .query("INSERT INTO chat (name,text) VALUES ($1,$2)", [from, text])
      .then(() => res.send("new message sent"))
      .catch(e => console.error(e));
  }
});
app.put("/message", (req, res) => {
  const text = req.body.text;
  const id = req.query.id;

  pool.query("UPDATE chat SET text=$1 WHERE id= $2 ", [text, id]).then(() =>
    res.send(`Text ${id} Updated`)).catch(e => console.log(e));

  //   messageToUpdate.from = req.body.from;
  //   messageToUpdate.text = req.body.text;
  //   console.log(messageToUpdate);
  //   const messagesList[updatedMessage] = req.body;
});
// app.get("/", (req, res) => {
//   res.send("Chat server is running here!");
// });
// app.get("/message", (req, res) => {
//   res.send(messagesList);
// });

// app.post("/message", (req, res) => {
//   if (
//     req.body.from === "" ||
//     req.body.text === "" ||
//     req.body.from === undefined ||
//     req.body.text === undefined
//   ) {
//     res.sendStatus(400);
//   } else {
//     const id = messagesList.length;
//     let messageTime = moment().format("MMMM Do YYYY, h:mm:ss a");
//     const newMessage = { ...req.body, id, messageTime };
//     messagesList.push(newMessage);
//     res.send(messagesList);
//   }
// });
// app.put("/message", (req, res) => {
//   const id = req.query.id;
//   let messageToUpdate = messagesList.find(message => {
//     return message.id === Number(id);
//   });

//   const result = { ...messageToUpdate, ...req.body };

//   //   messageToUpdate.from = req.body.from;
//   //   messageToUpdate.text = req.body.text;
//   //   console.log(messageToUpdate);
//   //   const messagesList[updatedMessage] = req.body;
//   res.send(result);
// });
// app.get("/message/:id", (req, res) => {
//   console.log(typeof req.params.id);

//   const searchMessage = messagesList.filter(
//     message => message.id === Number(req.params.id)
//   );
//   console.log(searchMessage);

//   res.send(searchMessage);=====================> I don't need it only for future examples
// });
// app.delete("/deleteMessage/:id", function (req, res) {
//   const deleteMessage = messagesList.findIndex(message => {
//     return message.id === Number(req.params.id);
//   });
//   //console.log(deleteMessage);
//   messagesList.splice(deleteMessage, 1);
//   res.send("Deleted message of ID" + req.params.id);
// });
app.delete("/deleteMessage/:id", function(req, res) {
  const id = req.params.id;

  pool
    .query("DELETE FROM chat WHERE id=$1", [id])
    .then(() => res.send(`message ${id} deleted!`))
    .catch(e => console.error(e));
});

// let messagesList = [
//   { id: 0, from: "Ali", text: "Hello" },
//   { id: 1, from: "Youssef", text: "I want to sleep" },
//   { id: 2, from: "Yosra", text: "I am hungry" },
//   { id: 3, from: "Meriem", text: "I need help" },
//   { id: 4, from: "Loic", text: "Well done" },
//   { id: 5, from: "Imen", text: "I want to sleep" },
//   { id: 6, from: "Graig", text: "I am hungry" },
//   { id: 7, from: "George", text: "I need help" },
//   { id: 8, from: "Luke", text: "Well done" },
//   { id: 9, from: "Jack", text: "I want to sleep" },
//   { id: 10, from: "Tina", text: "I am hungry" },
//   { id: 11, from: "Mimi", text: "this is cool" },
//   { id: 12, from: "Nada", text: "Nearly finish" },
//   { id: 13, from: "Irina", text: "Problem solved" },
//   { id: 14, from: "Sam", text: "See you tomorrow" },
//   { id: 15, from: "Will", text: "Be strong" },
//   { id: 16, from: "Dean", text: "you getting there" },
//   { id: 17, from: "Nina", text: "React is amazing!" },
//   { id: 18, from: "Kim", text: "Okay, thanks" }
// ];
app.listen(process.env.Port || 3004, () => {
  console.log("App chat server");
});
