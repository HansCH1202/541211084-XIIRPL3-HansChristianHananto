const http = require("http");

// const server = http.createServer((req, res) => {
    
//     // console.log(req); #menampilkan request postman
    
//     const {headers, url, method} = req;
//     console.log('headers', headers);
//     console.log('url', url);
//     console.log('method', method);

//     res.end('Hello, Im Hans')
// });

const todos = [
    {id: 1, text: 'Todo One'},
    {id: 2, text: 'Todo Two'},
    {id: 3, text: 'Todo Three'}
];

const server = http.createServer((req,res) => {

    const {method, url} = req;
    
    let body = [];
    
    req.on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();
        
        let status = 404;
        const response = {
            success: false,
            results: [],
            error: ''
        };
        
        if (method === 'GET' && url === '/todos') {
            
            status = 200;
            response.success = true;
            response.results = todos;
        } else if (method === 'POST' && url === '/todos') {
            
            const {id, text} = JSON.parse(body);
            
            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            } else {
                todos.push({id, text});
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }

        //status code & header in writeHead
        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js',
        });

        res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});