const express=require('express');
const fs=require('fs');
const csvtojson=require('csvtojson')
const router=express.Router();
const filePath='database.csv';

router.get('/',(req,res)=>{
    csvtojson()
  .fromFile(filePath)
  .then((jsonArray) => {
    console.log('JSON Data:', jsonArray);
    res.json(jsonArray);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

module.exports=router;