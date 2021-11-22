const server = require('./server');
const socketServer = require('./sockets/socket_server')(server);

const socketPort = process.env.SOCKET_PORT || 5002;
const port = process.env.PORT || 5001;


socketServer.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`));
server.listen(port, () => console.log(`Server is running on port ${port}.`));