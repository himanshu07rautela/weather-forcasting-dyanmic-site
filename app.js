const express = require("express");
const app = express();
const https = require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  var a=parseFloat(req.body.placename);
  const apiend ="https://api.openweathermap.org/data/2.5/weather?appid=ca5ef794b5114fb8e05e622ed489b4e9&q="+a+"&lang=en&units=metric";
  https.get(apiend,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      
      // Move the res.sendFile function here
      
    })
    res.sendFile(__dirname+"/index.html");
  })
});

app.post("/", function (req, res) {
  var a=req.body.placename;
  const apiend ="https://api.openweathermap.org/data/2.5/weather?appid=ca5ef794b5114fb8e05e622ed489b4e9&q="+a+"&lang=en&units=metric";
  https.get(apiend,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const tempreature=weatherdata.main.temp;
      const description=weatherdata.weather[0].description;
      const icon =weatherdata.weather[0].icon;
      const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      // Move the res.sendFile function here
      res.write("<h1>weather is good and temp is "+ tempreature+"</h1>");
      res.write("<p> the weather descrption is "+ description +"</p>");
      res.write("  <img src="+imgURL+">");
      res.send();
    })
    //keyboard check its good nigga
  })
});

app.listen(3000, function () {
  console.log("Your server has been successfully set up on port number 3000");
});
