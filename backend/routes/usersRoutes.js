const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController")


// ce sont des routes qui ressemble à une api de type REST, c'est pour ça on préfère garder le préfixe "/" et la racine /api/users/ dans le fichier server.js app.use(/api/users/)
router.put("/:id",usersController.updateUser)
router.delete("/:id",usersController.deleteUser)
router.post("/",usersController.addUser)
router.get("/:id",usersController.getById)
router.get("/",usersController.allUsers)

module.exports = router