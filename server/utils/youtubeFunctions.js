require('dotenv').config()
const axios = require('axios');
const key = process.env.YOUTUBE_API;
module.exports = {
       async searchByQuery(query){
        const info = []
        const urlSearch = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=50&q=${query}&key=${key}`;
        const {data} = await axios.get(urlSearch);
        data.items.forEach(item=>{
            info.push({id:item.id.videoId , title:item.snippet.title , channel:item.snippet.channelTitle})
        })
        return info
    }
}