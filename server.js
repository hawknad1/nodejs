const express = require("express");
const app = express();
const path = require("path");
const newLogger = require("./middleware/newLogger");

const PORT = 5000;
app.use(newLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/views", express.static(path.join(__dirname, "/public")));

// app.use("/root", root);
app.use("/", require("./routes/roots"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.listen(PORT, () => {
  console.log(`server listening on port on ${PORT}`);
});
