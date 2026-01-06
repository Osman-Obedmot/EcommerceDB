const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//create a new user
const signupUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (!err) {
      const { username, email } = req.body;
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hash,
        },
      });
      res.send(`User ${user.username} created successfully`);
    }
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).send(`User with email ${email} not found`);
  }

  if (user) {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.roles,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.send({
          message: "Login successful, Explore the different products",
          token: token,
        });
      } else {
        return res.status(401).send("Incorrrect password");
      }
    });
  }
};

//get user by id
const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userId: parseInt(req.params.userId),
    },
  });

  if (!user) {
    return res.status(404).send(`User with ID ${req.params.userId} not found`);
  } else {
    if (user.userId !== req.user.userId) {
      return res.status(403).send("Access denied");
    } else {
      res.send(user);
    }
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
};
