const http = require('http');

function createHandler() {
    let counter = 0;
    const handler = (req, res) => {
        if (req.method === 'POST') {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                id: ++counter,
                name: 'John'
            }));
            return;
        };
        if (req.url === '/users') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                numberOfUsers: counter
            }));
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: 'Url Not Found!'
        }));
    };
    return handler;
}
// Create a local server to receive data from


const server0 = http.createServer(createHandler());
const server2 = http.createServer(createHandler());

server0.listen(8000);
server2.listen(8002);
