const router = require('express').Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { UserModel } = require('../models');

router.post("/register", async (req, res) => {

    let { firstName, lastName, email, password } = req.body.user;

    try{
        let User = await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });
    
        res.status(201).json({
            message: "User succesfully registered",
            user: User
        });
    } catch(err) {
        if(err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or password already in use"
            });
        } else {
            res.status(500).json({
                message: "Failed to register user"
            });
        }
    }
})


module.exports = router