const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { getUserByEmail, getCurrentUser } = require("../services/userServices");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await getUserByEmail(email); // checks if user has already onboarded

    if (userExist) {
      return res.status(403).json({ error: "Email already in use" });
    }

    // hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating a new user here
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed" });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const devTee = (req, res) => {
//   res.send("hello DevTee");
// };

// const getAllUsers = (req, res) => {
//   res.send(users);
// };

const getMe = async (req, res) => {
  // querrying database using created user id to return user details
  const { id } = req.user;

  try {
    const user = await getCurrentUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { createUser, getMe };
