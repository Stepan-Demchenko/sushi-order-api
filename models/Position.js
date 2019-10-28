const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const positionsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    cost:{
        type: Number,
        required: true
    },
    category:{
        ref:'categories',
        type:Schema.Types.ObjectId
    },
    user:{
        ref:'users',
        type:Schema.Types.ObjectId
    },
});
module.exports = mogoose.model('positions', positionsSchema);
