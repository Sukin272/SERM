const express=require('express');
const fs=require('fs');
const csvtojson=require('csvtojson')
const json2csv=require('json2csv').parse;
const router=express.Router();
const filePath1='database.csv';
const filePath2='currently_issued.csv';

function checkIfTaken(rollno)
{
    csvtojson()
  .fromFile(filePath2)
  .then((jsonArray) => {
    console.log('JSON Data:', jsonArray);
    var flag=0
    for(const key in jsonArray){
        if(jsonArray.hasOwnProperty(key) && key=='rollno')
        {
            if(jsonArray[key]==rollno)
            {
                flag=1;
                break;
            }
        }
    }
    return flag;
  })
}

function checkAvail(item)
{
    csvtojson()
  .fromFile(filePath1)
  .then((jsonArray) => {
    console.log('JSON Data:', jsonArray);
    var flag=0
    for(const key in jsonArray){
        if(flag==0){
            if(jsonArray.hasOwnProperty(key) && key=='EquipName')
            {
                if(jsonArray[key]==item)
                {
                    flag=1;
                }
            }
        }
        else{
            if(jsonArray.hasOwnProperty(key) && key=='QuantityAvail')
            {
                if(Number(jsonArray[key])>0){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        }
    }
  })
}
function updateDatabase(item)
{
    csvtojson()
            .fromFile(filePath1)
            .then((jsonArray) => {
                var flag=0
                for(const key in jsonArray){
                    if(flag==0){
                        if(jsonArray.hasOwnProperty(key) && key=='EquipName')
                        {
                            if(jsonArray[key]==item)
                            {
                                flag=1;
                            }
                        }
                    }
                    else{
                        if(jsonArray.hasOwnProperty(key) && key=='QuantityAvail')
                        {
                            var k=Number(jsonArray[key]);
                            k-=1;
                            jsonArray[key]=String(k);
                            const csvData=json2csv(jsonArray,{header:true});
                            fs.writeFileSync(filePath1,csvData,'utf-8');
                        }
                    }
                }
            })
}
router.get('/',(req,res)=>{
    const roll=req.body.rollno;
    const email=req.body.email;
    const taken=checkIfTaken(roll);
    // console.log(taken);
    if(taken==0) // if not issued with same roll no prev
    {
        var response1={};
        if(checkAvail(req.body.item)){ // check if available
            response1={
                status: '202',    // not available
            };
            res.json(response1);
        }
        else{
            response1={
                status: '200',
            };
            res.json(response1);
            // adding entry in csv file
            // code here
            const csvData = json2csv(req.body, { header: true });

            // Write the CSV data to a file
            fs.writeFileSync(filePath2, csvData, 'utf-8');
            // updating database
            updateDatabase(req.body.item)
        }
    }
    else{
        const response={
            status: '201', // 201 if issued previously
        }
        res.json(response);
    }
});

module.exports=router;