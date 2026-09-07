const express = require("express");
const cors = require("cors") // pour autoriser certaines requetes extérieures
const app = express();

app.use(cors())
app.use(express.json()); // « Si une requête contient du JSON, transforme-le en objet JavaScript accessible avec req.body. »



app.use("/api/users",require("./routes/usersRoutes"))

app.listen("3001", ()=>{
    console.log("serveur démaré sur le port 3001")
}
)