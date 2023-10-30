import { createProxyMiddleware } from 'http-proxy-middleware';

const options = {
  target: 'http://www.example.org',
  changeOrigin: true,
  ws: true, // proxy websockets
  pathRewrite: {
    // '^/api' : '',
    '^/proxy/api/old-path': '/proxy/api/new-path',
  },
  onError(err, req, res, target) {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
  },
};

const proxy = createProxyMiddleware(options);

export default proxy;
