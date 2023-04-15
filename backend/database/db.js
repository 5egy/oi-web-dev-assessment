const {MongoClient} = require("mongodb")
const url = "https://segblog-backend.onrender.com/"
const client = new MongoClient(url)

const dbName = "my_blog"

async function connect(){
    await client.connect()
    const db = await client.db(dbName)
    return db
}

module.exports = connect