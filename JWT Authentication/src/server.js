const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Router } = require("express");
const userModel = require("../src/user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  jwt: { secret, refresh_secret },
} = require("../src/config/config");

var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const router = Router();

app.post("/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken === null) return res.statusCode(401);
  const user = await userModel.findOne({ refreshToken: refreshToken });
  const { email } = user;
  if (!user) return res.statusCode(403);
  jwt.verify(refreshToken, refresh_secret, (err, user) => {
    if (err) console.log("refresh token is not verified");
    const accessToken = jwt.sign({ email }, secret, {
      expiresIn: "1m",
    });
    res.json({ accessToken: accessToken });
  });
});

app.post("/registration", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const registrationFilter = {
    username: username,
    email: email,
    password: hashedPassword,
  };
  const registraion = await userModel.create(registrationFilter);
  res.send(registraion);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log("password is not valid!");
  }

  const accessToken = jwt.sign({ email }, secret, { expiresIn: "2s" });
  if (!accessToken) return res.statusCode(403);

  const refreshToken = jwt.sign({ email }, refresh_secret, {
    expiresIn: "30d",
  });
  await userModel.findByIdAndUpdate(user._id, {
    $set: { refreshToken: refreshToken },
  });
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.listen({ port: 3000 }, () => {
  console.info("Server running on port 3000");
});

module.exports = app;
