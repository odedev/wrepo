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



// import { createProxyMiddleware } from 'http-proxy-middleware';
// import app from './app.js'

// const proxy = 'http://127.0.0.1:8080/'
// let staticDir = 'public'



// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: proxy,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api' : ''
//     }
//   })
// );

// app.use(
//   '/file/api',
//   createProxyMiddleware({
//     target: proxy,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/file/api' : '/file'
//     }
//   })
// );

// app.use('/file', createProxyMiddleware({target: proxy, changeOrigin: true}));
