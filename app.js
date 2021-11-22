const path = require('path');
const server = require('./server/src/server');
const socketServer = require('./server/src/sockets/socket_server')(server);

const socketPort = process.env.SOCKET_PORT || 5002;
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === 'production' || 'staging') {
  const serve = require('sirv')('client/build');
  server
    .use(serve)
    .get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

socketServer.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`));
server.listen(port, () => console.log(`Server is running on port ${port}.`));
