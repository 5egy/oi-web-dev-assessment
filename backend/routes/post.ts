const postExpress = require("express");
const postRouter = postExpress.Router();
const connectPostsDB = require("../database/db");
const { ObjectId: postID } = require("mongodb");

type post = {
  _id: String,
  title: String,
  content:String,
  category:String,
  tags: String,
  author: String,
  comments: Array<String>
}


postRouter.get("/", async (req: any, res:any) => {
  const db = await connectPostsDB();
  const posts:Required<post>[] = await db.collection("posts").find().toArray();
  res.send(posts.reverse());
});

postRouter.get("/posts", async (req:any, res:any) => {
  const db = await connectPostsDB();
  const posts:Required<post>[] = await db.collection("posts").find().toArray();
  res.send(posts.reverse());
});

postRouter.get("/posts/:id", async (req:any, res:any) => {
  const id = req.params.id;
  const db = await connectPostsDB();
  const post:Required<post>[] = await db
    .collection("posts")
    .find({ _id: new postID(id) })
    .toArray();
  res.send(post[0]);
});

postRouter.post("/posts", async (req:any, res:any) => {
  const body:Required<post>[] = req.body
  const db = await connectPostsDB();
  await db.collection("posts").insertOne(body);
  res.json(body);
});

postRouter.patch("/posts/:id", async (req:any, res:any) => {
  const _id = new postID(req.params.id);
  const db = await connectPostsDB();
  await db.collection("posts").updateOne({ _id }, { $set: req.body });
  res.json("UPDATED")
});

postRouter.delete("/posts/",async  (req:any, res:any) => {
  const _id = new postID(req.body.id);
  const db = await connectPostsDB();
  await db.collection("posts").deleteOne({ _id })
  res.json("DELETED")
});

module.exports = postRouter;
