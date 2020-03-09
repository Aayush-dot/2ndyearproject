const express = require('express');
const request = require('request');
const app=express();
app.use(express.static("public"));

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

var word,val;

app.post("/dic2",function(req,res){
  res.render("dicindex");
});

app.post("/dic",function(req,res){
  res.redirect("/dic2");
});

app.post("/find",function(req,res){
  word=req.body.word;
  // console.log(word);
  let url="https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key="+"1f1f3a1c-0d7a-441c-a5a0-46094d35f54a";
  request(url,function(err,res1,body){
    // console.log(res1.body);
    val = JSON.parse(res1.body);
    console.log(val);
    if(val.meta == undefined)
    {
      res.render("failure");
    }
    else{
    res.render("find",{
      searched: word,
      received: val
    });
  }
});
});




app.listen("3000",function(){
  console.log("Listening at port 3000");
})
