import express from "express";
import User from "../models/user";

export class UserController {

    login = (req: express.Request, res: express.Response)=>{
        User.findOne(req.body, (err, user)=>{
            if (err) {
                console.log("Error getting User in login");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(user);
        });
    }

    register = (req: express.Request, res: express.Response)=>{
        let userData = req.body;
        userData.birthday = new Date(userData.birthday);
        let user = new User(userData);

        user.save().then(user=>{
            res.status(200).json({'message': 'User created', 'success': true})
        }).catch(err=>{
            res.status(401).json({'message': 'Error!', 'success': false})
        });
    }

    checkUsernameAndEmail = (req: express.Request, res:express.Response) => {
        let username = req.body.username;
        let email = req.body.email;
        let usernameTaken = false;
        let emailTaken = false;

        User.findOne({username: username}, (err, user)=>{
            if (err) {
                console.log("Error getting User in checkUsernameAndEmail");
                res.status(401).json({'message': 'Error!'});
            } else {
                if (user) usernameTaken = true;
                User.findOne({email: email}, (err, user)=>{
                    if (err) {
                        console.log("Error getting User in checkUsernameAndEmail");
                        res.status(401).json({'message': 'Error!'});
                    } else {
                        if (user) emailTaken = true;
                        res.status(200).json({'usernameTaken': usernameTaken, 'emailTaken': emailTaken});
                    }
                })
            }
        })

        


    }

    getAllPendingUsers = (req: express.Request, res: express.Response) => {
        User.find({status: 2}, (err, users)=>{
            if (err) {
                console.log("Error getting User in getAllPendingUsers");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(users);
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users)=>{
            if (err) {
                console.log("Error getting User in getAllPendingUsers");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(users);
        })
    }

    approveUser = (req: express.Request, res: express.Response) => {
        User.updateOne({username: req.body.username}, {status: 1}).then(news => {
            res.status(200).json({'message': 'OK', 'success': true});
        }).catch(err => {
            console.log("Error updating User in approveUser");
            res.status(401).json({'message': "Error", 'success': false});;
        })
    }

    rejectUser = (req: express.Request, res: express.Response) => {
        User.updateOne({username: req.body.username}, {status: 0}).then(news => {
            res.status(200).json({'message': 'OK', 'success': true});
        }).catch(err => {
            console.log("Error updating User in rejectUser");
            res.status(401).json({'message': "Error", 'success': false});;
        })
    }

}