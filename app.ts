import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import urlRouter from './url/url.route';
import setContentSecurityPolicy from './setContentSecurityPolicy';
import errorHandler from './errorHandler';

require('dotenv').config();

const app = express();
app.enable('trust proxy');

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.use(setContentSecurityPolicy);
app.use(express.static('./public'));
app.use('/', urlRouter);
app.use(errorHandler);

export default app;
