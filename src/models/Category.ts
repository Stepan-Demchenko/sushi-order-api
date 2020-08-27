import {Schema, model} from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    imageSrc: {
        type: String,
        default: ''
    }
});

export default model<any>("categories", categorySchema);
