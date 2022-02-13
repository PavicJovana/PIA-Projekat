import mongoose from "mongoose"

const Schema = mongoose.Schema;

let MicroLocation = new Schema({
    city_region: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String
    }
})

export default mongoose.model('MicroLocation', MicroLocation, 'micro_location')