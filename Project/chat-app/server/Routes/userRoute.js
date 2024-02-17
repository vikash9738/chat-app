const express =  require("express")
const {registerUser, findUser, loginUser, getUser} = require("../Controllers/userController")

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/",getUser)
router.get("/find/:userId",findUser)

module.exports = router
