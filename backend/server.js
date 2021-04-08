const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan') // For debug console
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const connectDB = require('./config/db')
const WebSocket = require('ws')
const http = require('http')

const helmet = require('helmet')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Helmet
app.use(helmet())

// Body parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // Lets code recompile when changed when in dev mode
}
// Sessions
app.use(cors({
  origin: process.env.BASEURL,
  credentials: true
}))
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/channel', require('./routes/message'))

const PORT = process.env.PORT || 4000

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Recieved ${message}`)
    ws.send(`Hello you sent -> ${message}`)
  })
  ws.send('Hi there, I am a WebSocket server')
})

server.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`)
})
