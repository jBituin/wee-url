import express, { Request, Response } from 'express';
import urlController from './url.controller';

const router = express.Router();

router.get('/', urlController.helloWorld);
router.post('/', urlController.createTinyUrl);
router.get('/:id', urlController.getUrl);

export default router;
