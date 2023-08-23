const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!!" });
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409);

  try {
    const hashedPwd = bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    userDB.setUser([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res
      .status(201)
      .json({ Success: `New User ${user} created successfully!!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleUser };
