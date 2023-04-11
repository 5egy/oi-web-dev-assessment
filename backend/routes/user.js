const express = require("express");
const router = express.Router();
const connect = require("../database/db");

router.get("/users", async (req, res)=>{
  const db = await connect();
  const users = await db.collection("users").find().toArray()
 res.json(users)
});

router.post("/login", async (req, res)=>{
  const db = await connect();
  const user = await db.collection("users").findOne({username: req.body.username})
  if(user.password === req.body.password) res.json(user)
});




router.post("/register", async (req, res)=>{
  const db = await connect();
  await db.collection("users").insertOne(req.body)
  res.json({...req.body})
});

module.exports = router;
