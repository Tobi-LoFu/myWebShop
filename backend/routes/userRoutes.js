import express from 'express';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async(req, res) =>{
    console.log('POST /api/users/signin');
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid email or password'});
}));

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    console.log('POST /api/users/signup');
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    })
    console.log('newUser',newUser);        
    
    const user = await newUser.save();
    res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
    });
    console.log('user', user); 
}))

userRouter.put(
    '/profile', isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log('PUT /api/users/profile');
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }
            const updatedUser = await user.save();
            
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({message: 'User not found'})
        }
    })
);

export default userRouter;