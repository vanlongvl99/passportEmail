const express = require('express')
const app = express()
const port = 3002

const systemInfo = require('./routes/systemInfo')
const redirectExample = require('./routes/redirectExample')


app.listen(port, ()=> {
    console.log(`server is listening on port: ${port}`)
})

app.get('/', (req, res) => {   // method get and give 1 link path
    res.send('hello world')  // can set header and html text
})

app.get('/aboutUs', (req, res) => {
    res.send('This is about us')
})


app.use('/systemInfo', systemInfo)  //defaut /systemInf for systemInfo router
app.use('/redirectExample', redirectExample)


