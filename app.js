const { json } = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appid = "f55d148ee469beed477e3ec5841e9b23";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
            res.write("<h3>The weather is currently <em>" + description + "<em>.</h3>");
            res.write("<img src="+iconurl+">");
            res.send();
        })
    })
})

    


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})