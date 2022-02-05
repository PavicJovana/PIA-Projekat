import mongoose from "mongoose"

const Schema = mongoose.Schema;

let Realestate = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    city: {
        type: String
    },
    city_region: {
        type: String
    },
    microlocation: {
        type: String
    },
    street: {
        type: String
    },
    size: {
        type: Number
    },
    rooms: {
        type: Number
    },
    construction_year: {
        type: Number
    },
    state: {
        type: String
    },
    heating: {
        type: String
    },
    floor: {
        type: String
    },
    total_floors: {
        type: Number
    },
    parking: {
        type: Number
    },
    monthly_utilities: {
        type: Number
    },
    price: {
        type: Number
    },
    about: {
        type: String
    },
    characteristics: {
        type: Array
    },
    type: {
        type: String
    },
    agent: {
        type: String
    },
    sold: {
        type: Number
    }
})

export default mongoose.model('Realestate', Realestate, 'realestate')