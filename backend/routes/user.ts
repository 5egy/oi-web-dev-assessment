const userExpress = require("express");
const router = userExpress.Router();
const connect = require("../database/db");
const { ObjectId: userID } = require("mongodb");

type user = {
  _id: string,
  username: string,
  password: string,
  fullName: string,
  email: string,
 };

router.get("/users", async (req:any, res:any)=>{
  function fillWithStar(value:string = ""):string{
    let star:string="";
   for(let i:number=0; i < value.length; i++){
      star += "*"
   }
    return star

 
  }
  const db = await connect();
  const users: Required<user>[] = await db.collection("users").find().toArray()
  res.json(users.map(user=>{
  return {
    ...user,
    password: fillWithStar(user.password),
    email: fillWithStar(user.email)
  }
 }))
});

router.post("/login", async (req:any, res:any)=>{
  const db = await connect();
  const user:Required<user> = await db.collection("users").findOne({username: req.body.username})
  if(user.password === req.body.password) res.json(user)
});

router.post("/register", async (req:any, res:any)=>{
  const user: user = {...req.body}
  const db = await connect();
  await db.collection("users").insertOne(user)
  res.json(user)
});

router.delete("/users",async  (req:any, res:any) => {
  const _id = new userID(req.body.id);
  const db = await connect();
  await db.collection("users").deleteOne({ _id })
  res.json("DELETED")
});

module.exports = router;
