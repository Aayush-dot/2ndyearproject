const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const { getChart } = require('billboard-top-100');
const giveMeAJoke = require('give-me-a-joke');
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get("/",function(req,res){
  res.render("landing");
});

// app.get("/",function(req,res){
//   res.render("landing");
// });



app.post("/home",function(req,res){
  res.render("home");
});

 var word,val1;

app.post("/dic",function(req,res){
  res.render("dicindex");
});



app.post("/find",function(req,res){
  word=req.body.word;
  // console.log(word);
  let url="https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key="+"1f1f3a1c-0d7a-441c-a5a0-46094d35f54a";
  request(url,function(err,res1,body){
    // console.log(res1.body);
    val1 = JSON.parse(res1.body);
    console.log(val1);
    if(val1[0] == undefined)
    {
      res.render("failure");
    }
    else if(val1[0].meta == undefined)
    {
      res.render("failure");
    }
    else{
    res.render("find",{
      searched: word,
      received: val1
    });
  }
});
});

var d = new Date();
var pastDate = d.getDate() - 7;
d.setDate(pastDate);
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var l= year+'-'+month+'-'+day;

  app.post("/bill",function(req,res){
getChart('hot-100',l, (err, chart) => {
  if (err) console.log(err);
  else
  {

    res.render("bill",{
      data: chart
    });

  }

});
  });

app.post("/joke",function(req,res){
  giveMeAJoke.getRandomDadJoke (function(joke) {
  res.render("joke",{
    joke: joke
  });
});
});

  app.post("/game",function(req,res){
    res.render("game");
  });



app.post("/news",function(req,res){
  var url ='http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'apiKey=6438b2fa356d49578b3807911f13dded';
request(url,function(err,res1,body){
 var val=JSON.parse(res1.body);
  console.log(val);
  res.render("news",{
    headlines: val
  });
});
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Listening at port 3000");
})

// 6438b2fa356d49578b3807911f13dded
