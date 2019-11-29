// get in information from my sys   

const express = require('express')


const router = express.Router()

// http://localhost:3000/systemInfo?type=os
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    let {type = ''} = req.query
    console.log(type)
    switch (type.toLowerCase()) {
        case 'os':
            const osPlaform = os.osPlaform()
            const osType = os.type()
            res.send(`<h1> perating system's platform: ${osPlaform} type: ${osType} </h1>`)
        default:
            res.send('wrong type')
    }
    // res.send('You call the systemInfo')


})


module.exports = router
