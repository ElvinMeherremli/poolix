const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

