const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(5000, () => {
    console.log(`server has benn started on ${port}`);
});
