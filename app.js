const express = require('express');
const bodyParser = require('body-parser');
const { getChart } = require('billboard-top-100');
var request = require('request');

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");



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

  app.get("/",function(req,res){
getChart('hot-100',l, (err, chart) => {
  if (err) console.log(err);
  else
  {

    res.render("bill",{
      data: chart
    });

  }
  console.log(chart.week) // prints the week of the chart in the date format YYYY-MM-DD
  console.log(chart.previousWeek.url) // prints the URL of the previous week's chart
  console.log(chart.previousWeek.date) // prints the date of the previous week's chart in the date format YYYY-MM-DD
  console.log(chart.nextWeek.url) // prints the URL of the next week's chart
  console.log(chart.nextWeek.date) // prints the date of the next week's chart in the date format YYYY-MM-DD
  console.log(chart.songs); // prints array of top 100 songs for week of August 27, 2016
  console.log(chart.songs[3]); // prints song with rank: 4 for week of August 27, 2016
  console.log(chart.songs[0].title); // prints title of top song for week of August 27, 2016
  console.log(chart.songs[0].artist); // prints artist of top songs for week of August 27, 2016
  console.log(chart.songs[0].rank) // prints rank of top song (1) for week of August 27, 2016
  console.log(chart.songs[0].cover) // prints URL for Billboard cover image of top song for week of Aug

});
  });



  app.listen("3000",function(){
  console.log("Listening at port 3000");
})
