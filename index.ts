import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import urlRouter from './url/url.route';
import setContentSecurityPolicy from './setContentSecurityPolicy';
import errorHandler from './errorHandler';

require('dotenv').config();

const server = express();
server.enable('trust proxy');

server.use(helmet());
server.use(morgan('common'));
server.use(express.json());

server.use(setContentSecurityPolicy);
server.use(express.static('./public'));
server.use('/', urlRouter);
server.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening at port:${PORT}`);
});
