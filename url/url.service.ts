import UrlModel from './url.model';
import IUrl from './url.interface';
import { ERRORS } from '../errors';
import { nanoid } from 'nanoid';
import validateUrlDTO from './url.validator';
import { ValidationError } from 'yup';

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
    try {
      await validateUrlDTO(urlDTO);
      if (!slug) {
        slug = nanoid(6);
      } else {
        const isExisting = await UrlModel.findOne({ slug });
        if (isExisting) {
          throw Error(ERRORS.SLUG_IN_USE);
        }
      }
      slug = slug.toLowerCase();
      return await UrlModel.insert({ slug, url });
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(ERRORS.INVALID_URL);
      } else {
        throw error;
      }
    }
  },
};
