require("dotenv").config();

const express = require("express");
// firrst step all through the cors
const cors = require("cors");
const fileupload = require("express-fileupload");
const sequelize = require("./db");
const routes = require("./routes");
const path = require("path");
const app = express();
app.use(cors());
app.use(fileupload({ createParentPath: true }));
app.use(express.static(path.resolve("static")));
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log("server is runnin on port" + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
