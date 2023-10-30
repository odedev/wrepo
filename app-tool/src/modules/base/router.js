import express from 'express';
import { getUUID } from './id/service.js';

const router = express.Router();

router.get('/base/uuid', function(req, res, next) {
  res.json(getUUID());
});

export default router;
