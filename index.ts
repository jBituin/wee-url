import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import urlRouter from './url/url.route';

require('dotenv').config();

const server = express();
server.enable('trust proxy');

server.use(helmet());
server.use(morgan('common'));
server.use(express.json());
server.use(express.static('./public'));

server.use('/url', urlRouter);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening at port:${PORT}`);
});
