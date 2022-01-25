import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import cityRouter from './routers/city.routes';
import agencyRouter from './routers/agency.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nekretnine');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok');
});

const router = express.Router();
//Add Routers
router.use('/users', userRouter);
router.use('/cities', cityRouter);
router.use('/agencies', agencyRouter);

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));