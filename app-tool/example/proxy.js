import { createProxyMiddleware } from 'http-proxy-middleware';
import app from './internal/app.js'

const proxy = 'http://127.0.0.1:8080/'
let staticDir = 'public'



app.use(
  '/api',
  createProxyMiddleware({
    target: proxy,
    changeOrigin: true,
    pathRewrite: {
      '^/api' : ''
    }
  })
);

app.use(
  '/file/api',
  createProxyMiddleware({
    target: proxy,
    changeOrigin: true,
    pathRewrite: {
      '^/file/api' : '/file'
    }
  })
);

app.use('/file', createProxyMiddleware({target: proxy, changeOrigin: true}));
