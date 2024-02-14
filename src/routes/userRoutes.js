const express = require("express");
const requireSignin = require("../middlewares/authenticate");
const {
  createUser,
  devTee,
  getAllUsers,
  getMe,
} = require("../controllers/userController");
const { validateUserData } = require("../middlewares/dataValidator");
const router = express.Router();

// router.get("/", devTee);
// router.get("/", getAllUsers);
router.post("/", validateUserData, createUser);
router.get("/me", requireSignin, getMe);

module.exports = router;
