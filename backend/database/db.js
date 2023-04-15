const {MongoClient} = require("mongodb")
const url = "mongodb://localhost:5000"
//mongodb+srv://soshice:xXzewLhtzTROsAL7@cluster0.syhr70n.mongodb.net/?retryWrites=true&w=majority

const client = new MongoClient(url)

const dbName = "my_blog"

async function connect(){
    await client.connect()
    const db = await client.db(dbName)
    return db
}

module.exports = connect