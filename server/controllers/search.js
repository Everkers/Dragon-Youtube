const router = require('express').Router();
const youtube = require('../utils/youtubeFunctions')
router.get('/' , async (req,res)=>{
    const title = req.query.q;
    try{
        const result = await youtube.searchByQuery(title)
        if(result.length < 1){
            res.json({message:'found nothing' , status:404})
        }
        res.json({message:'successfully got the data' , status:200 , data:result})  
    }
    catch(err){
        res.json({message:'an error occurred' , status:400})
    }
})
module.exports = router
