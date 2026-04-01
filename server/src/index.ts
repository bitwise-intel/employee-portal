import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
