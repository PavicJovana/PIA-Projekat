import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)
userRouter.route('/checkUsernameAndEmail').post(
    (req, res) => new UserController().checkUsernameAndEmail(req, res)
)
userRouter.route('/getAllPendingUsers').get(
    (req, res) => new UserController().getAllPendingUsers(req, res)
)
userRouter.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)
userRouter.route('/approveUser').post(
    (req, res) => new UserController().approveUser(req, res)
)
userRouter.route('/rejectUser').post(
    (req, res) => new UserController().rejectUser(req, res)
)

export default userRouter;