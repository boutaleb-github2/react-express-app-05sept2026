const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController")

router.delete("/:id",usersController.deleteUser)
router.post("/",usersController.addUser)
router.get("/:id",usersController.getById)
router.get("/",usersController.allUsers)

module.exports = router