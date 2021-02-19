import { object, string } from 'yup';
import IUrl from './url.interface';

const urlSchema = object().shape({
  slug: string()
    .trim()
    .optional()
    .matches(/^[\w\-]+$/i),
  url: string().trim().url().required(),
});

const urlDataValidate = async (payload: IUrl) => {
  const { slug, url } = payload;
  return await urlSchema.validate({
    slug,
    url,
  });
};

export default urlDataValidate;
