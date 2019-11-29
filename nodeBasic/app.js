const http = require('http');


const fs = require('fs');
const port = 3003;

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('index.html', function(err, data){
        if (err){
            
            res.writeHead('404')
            res.write('error: file not found');
        }else{
            res.write(data)

        }
        res.end();
    })
   

})

server.listen(port, function(err){
    if (err){
        console.log('something was wrong', err);
    }else{
        console.log('server is listening on port: ', port)
    }
})