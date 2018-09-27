require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000
const statusRoutes = require('./routers/status')
const userRoutes = require('./routers/user')

mongoose.connect('mongodb://localhost:27017/phase-2-live-code-2', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('[RUN]: Connected to mongooese...'))

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/users', userRoutes)
app.use('/status', statusRoutes)

app.listen(PORT, () => console.log('[RUN]: Listen in PORT ' + PORT));