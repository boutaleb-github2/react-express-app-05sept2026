const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

app.get("/api/users",(req,res)=>{
    res.json(users);
})

app.listen("3001", ()=>{
    console.log("serveur démaré sur le port 3001")
}
)