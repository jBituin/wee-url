import { Request, Response, NextFunction } from 'express';
import UrlService from './url.service';

export default {
  helloWorld(req: Request, res: Response) {
    res.send('Hello World!');
  },
  async getUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UrlService.getUrl(id);
      res.redirect(result);
    } catch (error) {
      next(error);
    }
  },
  async createTinyUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug, url } = req.body;
      const result = await UrlService.createTinyUrl({ slug, url });
      res.send(result);
    } catch (error) {
      next(error);
    }
  },
};
