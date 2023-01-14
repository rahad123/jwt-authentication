const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Router } = require("express");
const postModel = require("./post/post.model");
const authMiddleware = require("./auth.middleware");

var bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.json());
app.use(express.json());

const router = Router();

app.post("/", authMiddleware, async (req, res) => {
  const test = req.body.title;
  console.log('test', test);
  const post = await postModel.create(req.body);
  res.send(post);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const singlePost = await postModel.findById(id);
  res.send(singlePost);
});

app.get("/posts", async (req, res) => {
  const { page, perPage } = req.body;
  const skip = perPage * (page - 1);
  const posts = await postModel
    .find({})
    .sort({ createdAt: "DESC" })
    .skip(skip)
    .limit(perPage); 

  const headers = req.headers;
  console.log('headers', headers);

  res.send(posts);
});

app.listen({ port: 3001 }, () => {
  console.info("Server running on port 3001");
});

module.exports = app;
