const express = require("express");
const app = express(); // using express here
const sanitizer = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // establish connection between client(frontend) and server(backend)
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

// cors option object
const corsOptions = {
  origin: "http://localhost:3000", // frontend url
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various versions of Safari) choke on 204
  credentials: true,
};

//  middleware to use for every request (global middleware)
app.use(cors(corsOptions)); // enables cross-origin access control, granting frontend access to our backend API

//configuration for sending json data on our application
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/auth", authRoutes);

app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
);

module.exports = app;
