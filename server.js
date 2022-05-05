const http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer((request, response) => {
    let addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });
    
    //checks what is the exact pathname of URL; the part that comes after http://localhost.8080/...
    //q is where I stored parsed URL from user
    //dirname is module-specific variable that provides path to current directory

    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    //after fetching and parsing URL, now fs module uses readFile function to grab appropriate file from server
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(8080);

console.log('My test server is running on Port 8080.');