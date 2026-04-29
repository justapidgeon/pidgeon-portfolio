const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = { html:'text/html', css:'text/css', js:'text/javascript', png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg' };

http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    try {
        const data = fs.readFileSync(filePath);
        const ext = path.extname(filePath).slice(1);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
        res.end(data);
    } catch (e) {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(3000, () => console.log('Server on 3000'));
