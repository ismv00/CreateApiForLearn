const express = require('express');
const authMIddleware = require('../middlewares/auth')

const router = express.Router();

router.use(authMIddleware);

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId });
})

module.exports = app => app.use('/projects', router);