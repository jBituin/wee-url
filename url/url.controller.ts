import { Request, Response, NextFunction } from 'express';
import path from 'path';
import UrlService from './url.service';

const notFoundPath = path.join(__dirname, '../public/404.html');

export default {
  async getUrl(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UrlService.getUrl(id);
      res.redirect(result);
    } catch (error) {
      res.status(404).sendFile(notFoundPath);
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
