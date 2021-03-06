const express = require('express');
const bodyParser = require('body-parser');
const pc = require('./model/pcschema');
const cors = require('cors');
const morgan =  require('morgan');
const app = express();
const port = process.env.PORT ||3000;

app.use(morgan('dev'));
app.use(cors());

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Welcome to thing green iot data bank.Server is ready to take your device hit @/api/databanks/meter')
})

app.post('/api/databanks/create_pc_for_hid',(req,res)=>{
    pc.create({pc:req.body.pc}).then(x=>res.json(x));
})

 app.post('/api/databanks/update_pc_status',(req,res)=>{
    pc.findByIdAndUpdate('5c8c94b6e765641f3cfd464f',{$set:{pc:req.body.pc}},{upsert:true},(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            if (!result) {
                res.send('you have not set pc value for this hardware id')
            } else {
                pc.findById('5c8c94b6e765641f3cfd464f')
                .select('pc')
                .exec()
                .then(x=>{res.send(`pc=${x.pc}`)})
                .catch(x=>res.send(x)); 
            }
        }
    });
});
app.post('/api/databanks/meter',(req,res)=>{
    res.status(200).send('PC=1')

    console.log(`--------------body--------------------`);
    console.log(req.body);
    console.log(`--------------params--------------------`);
    console.log(req.params);
    console.log(`--------------query--------------------`);
    console.log(req.query);
    console.log('body--->'+JSON.stringify(req.body))
    console.log('params--->'+JSON.stringify(req.params))
    console.log('params--->'+JSON.stringify(req.query))
});
app.get('/api/databanks/meter',(req,res)=>{
    res.status(200).send('PC=1')

    console.log(`--------------body--------------------`);
    console.log(req.body);
    console.log(`--------------params--------------------`);
    console.log(req.params);
    console.log(`--------------query--------------------`);
    console.log(req.query);
    console.log(JSON.stringify(req.body))
    console.log(JSON.stringify(req.params))
    console.log(JSON.stringify(req.query))
});

app.listen(port, () => console.log(`server is running at ${port}`));
