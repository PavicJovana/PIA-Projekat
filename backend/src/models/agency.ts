import mongoose from "mongoose"

const Schema = mongoose.Schema;

let Agency = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: String
    },
    pib: {
        type: String
    }
})

export default mongoose.model('Agency', Agency, 'agencies')