const express = require('express');
const app = express();
const cors = require('cors');
const search= require('./controllers/search')
const download = require('./controllers/getUrl')
const port = process.env.PORT || 3000;
app.use(express.json())
app.use('/search' , search)
app.use('/download' , download)
app.use(cors())
app.listen(port , ()=> console.log(`listening on port ${port}`))