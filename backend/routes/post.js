const express = require("express");
const router = express.Router();
const connect = require("../database/db");
const { ObjectId } = require("mongodb");

router.get("/posts", async (req, res) => {
  const db = await connect();
  const posts = await db.collection("posts").find().toArray();
  res.send(posts.reverse());
});

router.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const db = await connect();
  const post = await db
    .collection("posts")
    .find({ _id: new ObjectId(id) })
    .toArray();
  res.send(post[0]);
});

router.post("/posts", async (req, res) => {
  const db = await connect();
  await db.collection("posts").insertOne(req.body);
  res.json(req.body);
});

router.patch("/posts/:id", async (req, res) => {
  const _id = new ObjectId(req.params.id);
  const db = await connect();
  await db.collection("posts").updateOne({ _id }, { $set: req.body });
  res.json("UPDATED")
});

router.delete("/posts/",async  (req, res) => {
  const _id = new ObjectId(req.body.id);
  const db = await connect();
  await db.collection("posts").deleteOne({ _id })
  res.json("DELETED")
});

module.exports = router;
