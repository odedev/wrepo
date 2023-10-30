
import express from 'express';
import baseRouter from './base/router.js';
import systemRouter from './system/router.js';


const router = express.Router();

router.use(baseRouter);
router.use(systemRouter);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tool' });
});

export default router;
