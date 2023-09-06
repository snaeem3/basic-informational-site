const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;
const page404 = '404.html';

const server = http.createServer((req, res) => {
  console.log(req.url);
  let page = req.url;

  page = page.substring(1); // Remove '/'

  if (page === '') {
    page = 'index';
  }

  page = page.concat('.html');

  console.log(`Opening ${page}`);
  fs.readFile(page, (err, data) => {
    if (err) {
        console.error(err);
        fs.readFile(page404, (err, data) => {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
