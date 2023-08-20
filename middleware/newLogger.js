const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const newLogger = async (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().getFullYear();
  const id = uuid();
  const details = `${method}\t${url}\t${id}\t${date}\n`;
  console.log(details);
  next();

  if (!fs.existsSync("./newLog")) {
    fsPromises.mkdir(path.join(__dirname, "..", "newLog"));
  }

  if (fs.existsSync("./newLog")) {
    await fsPromises.appendFile(
      path.join(__dirname, "..", "newLog", "log.txt"),
      details
    );
  }
};

module.exports = newLogger;
