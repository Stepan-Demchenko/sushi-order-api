const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        ref:'users',
        type:Schema.Types.ObjectId
    },
    imageSrc:{
        type: String,
        default:''
    }
});
module.exports = mogoose.model('categories', categorySchema);
