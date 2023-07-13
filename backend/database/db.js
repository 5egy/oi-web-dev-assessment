const {MongoClient} = require("mongodb")
const URL = process.env.URL;
// const url = "mongodb+srv://soshice:xXzewLhtzTROsAL7@cluster0.syhr70n.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(URL)

const dbName = "my_blog"

async function connect(){
    await client.connect()
    const db = await client.db(dbName)
    return db
}

module.exports = connect