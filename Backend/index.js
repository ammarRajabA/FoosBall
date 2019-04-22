var express=require('express');
var bodyParser=require("body-parser");
var config=require('./src/config');

var matches=require("./src/routes/matches.js");


var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/matches',matches);

app.listen(config.app.port.production,()=>console.log('Server is running in Production Mode'))
