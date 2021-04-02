const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Message = require('../models/Message')



router.get('/:id',ensureAuth,async (req,res) => {
    try {
        let _messages = await Message.find({channel: req.params.id}).limit(50).sort({sent: 'asc'})
        res.json({
            messages: _messages
        })
    }
    catch {
        console.error('Could not get messages')
    }
})
router.post(':id', ensureAuth, async (req, res) => {
    try {

    }
    catch {
        console.error('Could not send message')
    }
})
module.exports = router