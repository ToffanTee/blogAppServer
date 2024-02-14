const validateUserData = (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send({ error: "Missing body request." });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ error: "Passwords do not match!" });
  }

  // if (typeof email !== "e") {
  //   return res.status(400).send({ error: "Age must be a number" });
  // }

  next();
};

module.exports = { validateUserData };
