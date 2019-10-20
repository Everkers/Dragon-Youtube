const express = require('express');
const app = express();
const cors = require('cors');
const search= require('./controllers/search')
const download = require('./controllers/getUrl')
const playlist = require('./controllers/getPlaylist')
const port = process.env.PORT || 3000;
app.use('/search' , search)
app.use('/download' , download)
app.use('/playlist' , playlist)
app.use(express.json())
app.use(cors())
app.listen(port , ()=> console.log(`listening on port ${port}`))