const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// delay a bit
setTimeout(() => server.use(), 1000);
console.log('delayed 1000 ms...');

// set the default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

// use the JSON server body-parser to handle POST, PUT, PATCH
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
    if (['POST', 'PATCH', 'PUT'].includes(req.method)
    && req.url.match(/pets/)
    ) {
        // validate the pet name and kind
            let errors = null;

        if (!req.body.name) {
            errors = errors || {};
            errors.name = "Name can't be blank";
        }
        if (req.body.kind !== 'cat' && req.body.kind !== 'dog') {
            errors = errors || {};
            errors.kind = "Kind must be 'cat' or 'dog'";
        }

        if (errors) {
            return res.status(400).json(errors);
        }
    }
    // continue to JSON server router
    next();
});

// Use default router
server.use(router);
server.listen(3001, () => {
    console.log('Pet Store server is running');
})

// https://github.com/typicode/json-server#getting-started