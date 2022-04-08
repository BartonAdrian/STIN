const express=require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hi, my name is Saffrona. How can I help you ?')
})

module.exports=router