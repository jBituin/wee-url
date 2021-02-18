import yup from 'yup';
import IUrl from './url.interface';

const urlSchema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i),
  url: yup.string().trim().url().required(),
});

const urlDataValidate = async (payload: IUrl) => {
  const { slug, url } = payload;
  return await urlSchema.validate({
    slug,
    url,
  });
};

export default urlDataValidate;
