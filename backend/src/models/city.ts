import mongoose from "mongoose"

const Schema = mongoose.Schema;

let City = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
})

export default mongoose.model('City', City, 'city')