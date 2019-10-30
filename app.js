const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const orderAnalytics = require('./routes/analytics');
const orderCategory = require('./routes/category');
const orderPosition = require('./routes/position');

mongoose.connect('mongodb://localhost:27017/node-app').then(() => console.log('connected to DB')).catch((e) => console.log(e));
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/analytics', orderAnalytics);
app.use('/api/category', orderCategory);
app.use('/api/position', orderPosition);
app.use('/api/uploads', express.static(process.cwd()+'/uploads'));

module.exports = app;
