import mongoose from "mongoose"

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    city: {
        type: String
    },
    birthday: {
        type: Date
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    agency: { //moze biti i id
        type: String
    },
    licence_number: {
        type: String
    },
    type: {
        //0 - admin
        //1 - oglasivac
        //2 - kupac
        type: Number
    },
    status: {
        //0 - odbijen
        //1 - prihvacen
        //2 - na cekanju
        type: Number
    }
})

export default mongoose.model('User', User, 'users')