require('dotenv').config();
const express = require("express")
const cors = require("cors");
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const app = express();

const bodyParser = require("body-parser")
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],

}))
app.use(bodyParser.json())
app.use(userRoutes)
app.use(postRoutes)



app.listen(5000, ()=>{
console.log("SERVER RUNNING")
})