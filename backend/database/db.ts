const {MongoClient} = require("mongodb")
const url = process.env.URL;
const client = new MongoClient(url)

const dbName = "my_blog"

async function connectDB(){
    await client.connect()
    const db = await client.db(dbName)
    return db
}

module.exports = connectDB