const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
// @desc Login
// @route GET /
router.get('/',ensureGuest, (req,res) => {
    res.send('Login');
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res) => {
    res.json({test:'hello world'})
})
module.exports = routerasd