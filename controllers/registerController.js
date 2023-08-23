const User = require("../model/User");

const bcrypt = require("bcrypt");
const path = require("path");
const fsPromises = require("fs").promises;

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: `User name and Password required!!` });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashed = await bcrypt.hash(pwd, 10);

    //create and store new user
    const result = await User.create({
      username: user,
      password: hashed,
    });

    console.log(result);

    res
      .status(201)
      .json({ message: `User ${user} registration successfull!!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
