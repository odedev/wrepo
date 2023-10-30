import http from 'node:http';
import app from './app.js';

const server = http.createServer(app);

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port';

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`listening on ${bind} `);
});

function serve() {
  server.listen(23701);
}

export default serve
