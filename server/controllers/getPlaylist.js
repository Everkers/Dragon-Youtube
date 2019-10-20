//TODO: GO GET ALL SONGS IDS FROM THE PLAYLIST (CREATE THIS FUNCTION ON YOUTUBEFUNCTIONS FILE) => GET PLAYBACK URL OF ALL THIS SONGS AND SEND THEM 
const express = require('express')
const youtube = require('../utils/youtubeFunctions')
const ytdl = require('ytdl-core');
const router = express.Router();
router.get('/' , async (req,res)=>{
    try{
        const id = req.query.id;
        const result= await youtube.getPlaylist(id);
        const urls = [];

        const baseYoutube =`https://www.youtube.com/watch?v=`
        
        if(result.status == 200){
            const ids = result.data;
             ids.forEach(id=>{       
                // console.log(ids.length)
                ytdl(baseYoutube + id , {filter:'audioonly'});
                ytdl.getInfo(`${baseYoutube + id}` ,  (err , info)=>{
                    if(err){
                        throw err
                    }
                    else{
                        let audioformat =  ytdl.filterFormats(info.formats , 'audioonly');
                        urls.push(audioformat[0].url)
                        if(urls.length == ids.length -1 ){
                            res.send({songs:urls , message:'success'})
                        }
                    }
                })
            })
        }

    }
    catch(err){
        console.log(err)
    }
})
module.exports = router