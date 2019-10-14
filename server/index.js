const express = require('express');
const app = express();
const cors = require('cors');
const search= require('./controllers/search')
const download = require('./controllers/getUrl')
app.use(express.json())
app.use('/search' , search)
app.use('/download' , download)
app.use(cors())
app.listen('4000' , ()=> console.log('listening on port 4000'))