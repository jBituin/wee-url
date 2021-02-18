import { Request, Response } from 'express';

export default {
  helloWorld(req: Request, res: Response) {
    res.send('Hello World!');
  },
  async getUrl(req: Request, res: Response) {
    res.send('@GET url/:id');
  },
  async createTinyUrl(req: Request, res: Response) {
    res.send('@POST url');
  },
};
