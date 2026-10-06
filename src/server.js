const http = require('http');

const app = require('./app');
const config = require('./config');

function initProcessHandlers(server) {
    const shutdown = (signal) => {
        console.log(`${signal} received: closing HTTP server`);
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('uncaughtException', (err) => {
        console.log('uncaughtException', err);
        server.close(() => process.exit(1));
    });

    process.on('unhandledRejection', (reason) => {
        console.log('unhandledRejection', reason);
    });
}

const server = http.createServer(app);
initProcessHandlers(server);

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
