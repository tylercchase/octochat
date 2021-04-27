const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sent: {
    type: Date,
    default: Date.now
  },
  channel: {
    type: String,
    required: true
  },
  user: {
    type: String
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
  }
})

module.exports = mongoose.model('Message', MessageSchema)
