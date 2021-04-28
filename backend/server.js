const dotenv = require('dotenv')
const connectDB = require('./config/db')
const http = require('http')

const Message = require('./models/Message')

// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const PORT = process.env.PORT || 4000

const server = http.createServer()

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4000',
    credentials: true
  }
})

io.on('connection', async (socket) => {
  socket.on('message', data => {
    console.log(data)
    Message.create({ content: data.message, channel: data.channel, user: data.user }).then(_message => {
      io.emit('message', _message)
    })
  })
  socket.on('channeljoin', _channel => {
    console.log(`Joining channel: ${_channel}`)
    Message.find({ channel: _channel }).then(_messages => {
      socket.emit('channeljoin', {
        messages: _messages,
        channel: _channel
      })
    })
  })
})

server.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`)
})
