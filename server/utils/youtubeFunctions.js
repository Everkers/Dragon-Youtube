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
    },

    async getPlaylist(id){
      try{
        const IDs = [];
        let nextPage = null
        let urlSearch = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${key}`;
        const res = await axios.get(urlSearch);
        const data = res.data.items;
        nextPage = res.data.nextPageToken;
        data.forEach(item=>{
            IDs.push(item.snippet.resourceId.videoId)
        })

        if(nextPage != undefined){
           const res = await handleNextPage(nextPage)
           let n = res
           while(n != undefined){
               const t = await handleNextPage(n)
               n = t
           }
        }

        async function handleNextPage(token){
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${key}&pageToken=${token}`
            const res = await axios.get(url);
            const data = res.data.items;
            const t = res.data.nextPageToken;
            data.forEach(item=>{
                IDs.push(item.snippet.resourceId.videoId)
            })
            return t
        }
        return {data:IDs , status : 200}
    }
      catch(err){
        return {data:'an error occurred during the fetch process' , status : 400}
      }
    }
}