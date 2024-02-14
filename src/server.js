const http = require("http"); // core module on node js
const app = require("./app");
const connectDb = require("./utils/dbConnect");
const envVariables = require("./constants/index");
const httpServer = http.createServer(app);

const { PORT } = envVariables;

const startServer = async () => {
  await connectDb(); // to connect database

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // to establish server
  });
};

startServer();
