import express from 'express';
import slowDown from 'express-slow-down';
import rateLimit from 'express-rate-limit';

import urlController from './url.controller';

const router = express.Router();

router.get('/', urlController.helloWorld);
router.post(
  '/',
  slowDown({ windowMs: 10 * 1000, delayAfter: 1, delayMs: 500 }),
  rateLimit({ windowMs: 10 * 1000, max: 1 }),
  urlController.createTinyUrl
);
router.get('/:id', urlController.getUrl);

export default router;
