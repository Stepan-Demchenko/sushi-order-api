import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import orderCategory from './routes/category';
import { middleware } from './middleware/passport';

const app = express();
const port = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`server has benn started on ${port}`);
});

mongoose
  .connect('mongodb://localhost:27017/node-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to DB'))
  .catch((e) => console.log(e));

app.use(passport.initialize());
middleware(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/category', orderCategory);
app.use('/uploads', express.static(process.cwd() + '/uploads'));
