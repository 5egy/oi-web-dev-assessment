const express = require("express")
const cors = require("cors");
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const app = express();
const bodyParser = require("body-parser")
app.use(cors({
    origin: ["https://segblog.vercel.app", "http://localhost:3000", "http://localhost:5500"]
}))
app.use(bodyParser.json())
app.use(userRoutes)
app.use(postRoutes)



app.listen(5000, ()=>{
    console.log("SERVER RUNNING")
})
//At7GgLLZQntBz2gW
//mongodb+srv://soshice:At7GgLLZQntBz2gW@cluster0.syhr70n.mongodb.net/?retryWrites=true&w=majority