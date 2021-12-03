const express = require('express');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User  = require ('../Models/User');

function generateToken(params = {} ){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}
const router = express.Router();

router.post('/register', async (req, res) => {

    const { email } = req.body;
    try {

        if(await User.findOne ({ email }))

        return res.status(400).send({ error: 'User already exists'})

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id}),
        });


    } catch (err) {
        return res.statys(400).send({ error: 'Registration Failed'})
    }

});

router.post('/autenticate', async (req, res) => {

    
    const { email, password} = req.body;

    const user = await User.findOne( { email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'User not found' });

    if(!await bcrpyt.compare(password, user.password)) //comparando se a senha não sao iguais
        return res.status(400).send({ error : 'Invalid Password' });

    user.password = undefined;


    res.send({ 
        user,
        token: generateToken({ id: user.id}) })
})

module.exports = app => app.use('/auth', router);