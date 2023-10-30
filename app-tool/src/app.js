import path from 'node:path';
import {fileURLToPath} from 'node:url';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import logger from 'morgan';
import httpErrors from 'http-errors';
import router from "./modules/router.js";
import proxy from './proxy.js';


// 执行命令的目录
const __rootDirname = path.resolve();
// 当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(favicon(path.join(__rootDirname, 'public', 'favicon.ico')))
app.use('/public', express.static(path.join(__rootDirname, 'public')));

app.use('', router);
app.use('/proxy', proxy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(httpErrors(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
