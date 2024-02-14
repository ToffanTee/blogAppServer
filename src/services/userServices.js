const User = require("../models/userModel");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  }
};

const getCurrentUser = async (userId) => {
  const user = await User.findOne({ _id: userId })
    .select("-password")
    .select("-__v");

  if (user) {
    return user;
  }
};

module.exports = { getUserByEmail, getCurrentUser };
