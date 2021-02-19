import UrlModel from './url.model';
import IUrl from './url.interface';
import { ERRORS } from '../errors';
import { nanoid } from 'nanoid';
import validateUrlDTO from './url.validator';

export default {
  async getUrl(id: string) {
    try {
      const data: IUrl = await UrlModel.findOne({ slug: id });
      if (!data) {
        throw new Error(ERRORS.URL_NOT_FOUND);
      }
      return data.url;
    } catch (error) {
      throw new Error(ERRORS.URL_NOT_FOUND);
    }
  },

  async createTinyUrl(urlDTO: IUrl) {
    let { slug, url } = urlDTO;
    await validateUrlDTO(urlDTO);
    try {
      if (!slug) {
        slug = nanoid(6);
      } else {
        const isExisting = await UrlModel.findOne({ slug });
        if (isExisting) {
          throw new Error(ERRORS.SLUG_IN_USE);
        }
      }
      slug = slug.toLowerCase();
      const newUrl = await UrlModel.insert({ slug, url });
      return newUrl;
    } catch (error) {
      throw new Error(error);
    }
  },
};
