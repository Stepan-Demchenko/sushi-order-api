import app from './app';

const port = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`server has benn started on ${port}`);
});
