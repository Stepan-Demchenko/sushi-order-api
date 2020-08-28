import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import orderCategory from './routes/category';
import orderPosition from './routes/position';
import { middleware } from './middleware/passport';

const app = express();

mongoose
  .connect('mongodb://localhost:27017/node-app')
  .then(() => console.log('connected to DB'))
  .catch((e) => console.log(e));

app.use(passport.initialize());
middleware(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded());

// parse application/json
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/category', orderCategory);
app.use('/api/position', orderPosition);
app.use('/api/uploads', express.static(process.cwd() + '/uploads'));

export default app;
