const Database = require('./database')

const database1 = Database.shareInstance()

const database2 = Database.shareInstance()

database1.name = "my DB"

console.log(`this is database ${JSON.stringify(database2)}`)