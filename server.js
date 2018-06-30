const express= require("express");
const bodyParser= require("body-parser");
const MongoDb=require('mongodb').MongoClient;

let app=express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let footbalplayers=[
    {
        id:1, 
        name: 'avan'
    },
    {
        id:2, 
        name: 'ubam'
    },
    {
        id:3, 
        name: 'LoHAN'
    }

];

app.get('/', function(req, res){
    res.send("hi world");
})
app.get('/fp', function(req, res){
    res.send(footbalplayers);
})
app.get('/fp/:id', function(req, res){
    console.log(req.params);
    let fp=footbalplayers.find(function(fp){
        return fp.id===Number(req.params.id);
    });    
    res.send(fp);

})
app.post('/fp', function(req, res){
    let footbalplayer={
        id: Date.now(),
        name: req.body.name
    };
    footbalplayers.push(footbalplayer);
    res.send(footbalplayer);
})
app.put('/fp/:id', function(req,res){
    let fp=footbalplayers.find(function(fp){
        return fp.id===Number(req.params.id);
    });  
    fp.name=req.body.name;
    res.sendStatus(200);

})
app.delete('/fp/:id', function(req, res){
   footbalplayers=footbalplayers.filter(function (fp){
        return fp.id!== Number(req.params.id);
    })
    res.sendStatus(200);
})


MongoDb.connect('mongodb://localhost:27017/myapi', function(err, database){
    if (err) return console.log(err);
    db=database;
    const port= 8080;
    app.listen(port, function(){
        console.log('API app started');
    
    })
    
})