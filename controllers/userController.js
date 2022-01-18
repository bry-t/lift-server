const router = require('express').Router()
const { UniqueConstraintError } = require('sequelize');
const { UserModel } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register',  async (req, res) => {

    let { firstName, lastName, email, password } = req.body;

    try {
        let User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 12)
        });

    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})    

        res.status(200).json({
            message: "User successfully registered",
            sessionToken: token

        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
            message: "Email already in use",
    });
    } else {
        res.status(500).json({
        message: "User failed to register"
    })
    }
    }
});

router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    
    try{
        let loginUser = await UserModel.findOne({
            where: {
                email,
            },
        });
        
        if(loginUser) {

            let pwdCompare = await bcrypt.compare(password, loginUser.password);

            if(pwdCompare) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                res.status(200).json({
                    message: "User successfully logged in",
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;