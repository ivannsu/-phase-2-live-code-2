require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(PORT, () => console.log('[RUN]: Listen in PORT ' + PORT));