const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiKey = "2dbb875dccf485aae096ebb5d7983739";
const request = require("request");
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', function(req,res){
    res.render('index', {weather: null, error: null });
});

app.post('/', function(req,res){
    let city = (req.body.city);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function(err,response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else{
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else{
                let temCon = Math.round((weather.main.temp - 32) * 5/9);
                let weatherText = `It's ${temCon} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error:null});
            }
        }
    });
});

app.use(function(req,res)
{
    res.status(404)
    res.send("Error, Enter again!")
})

app.listen(port,function(){
    console.log("App listing successfully");
});