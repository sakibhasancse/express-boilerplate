import  express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import routes from '../modules'

const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));

const port = parseInt(process.env.PORT || 8000, 10); // Get port from environment

/* configure port to app */
app.set('port', port);

/* configure routes */
routes(app);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((error, req, res) => {
    console.error(error);

    res.status(error.status || 500);
    res.json({
        message: "Oops! Couldn't perform this action at the moment. Please try again",
        error
    });
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Bind onError and onListening handler
 */
server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`); // eslint-disable-line no-console
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
});

export function start(done) {
  server.listen(port, done);
}

export function lower(done) {
    server.close(done);
}

export default app