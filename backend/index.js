const express = require("express")
const cors = require("cors");
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const app = express();
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(userRoutes)
app.use(postRoutes)



app.listen(5000)
//At7GgLLZQntBz2gW
//mongodb+srv://soshice:At7GgLLZQntBz2gW@cluster0.syhr70n.mongodb.net/?retryWrites=true&w=majority