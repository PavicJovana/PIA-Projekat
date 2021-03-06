import mongoose from "mongoose"

const Schema = mongoose.Schema;

let CityRegion = new Schema({
    city: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String
    }
})

export default mongoose.model('CityRegion', CityRegion, 'city_region')