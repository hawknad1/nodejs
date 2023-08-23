require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const newLogger = require("./middleware/newLogger");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = 5000;

//connect to DB
connectDB();

//middlewares
app.use(newLogger);
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/views", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/roots"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => {
    console.log(`server listening on port on ${PORT}`);
  });
});
