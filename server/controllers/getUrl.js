const router = require('express').Router();
const ytdl = require('ytdl-core');
router.get('/' , (req,res)=>{
    const id = req.query.id;
    const baseYoutube =`https://www.youtube.com/watch?v=`
    const videoReadableStream = ytdl(baseYoutube + id , {filter:'audioonly'});
    ytdl.getInfo(`${baseYoutube + id}` , (err , info)=>{
            let audioformat = ytdl.filterFormats(info.formats , 'audioonly');
            res.json({audioUrl:audioformat[0].url , message:'successfully' , title:info.title})
    })
})
module.exports = router