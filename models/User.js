const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
module.exports = mogoose.model('users', userSchema);
