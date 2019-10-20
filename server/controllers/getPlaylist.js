//TODO: GO GET ALL SONGS IDS FROM THE PLAYLIST (CREATE THIS FUNCTION ON YOUTUBEFUNCTIONS FILE) => GET PLAYBACK URL OF ALL THIS SONGS AND SEND THEM 
const express = require('express')
const youtube = require('../utils/youtubeFunctions')
const router = express.Router();
router.get('/' , async (req,res)=>{
    try{
        const id = req.query.id;
        const result= await youtube.getPlaylist(id);
        if(result.status == 200){
            
        }
    }
    catch(err){
        console.log(err)
    }
})
module.exports = router