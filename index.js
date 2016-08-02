var repl = require('repl');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://substack.net/images/';


request.get(url, function(error, response, html){
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(html);
    var finalArray = [];

    $('tr').filter(function(){
      permit = $(this).children().first().children().text();
      extension = $(this).children().last().children().attr("href");
      suffix = $(this).children().last().children().text().split('.')[1];

      var csvString = permit + "," + (url + extension) + "," + ("." + suffix);
      finalArray.push(csvString);
    });

    fs.writeFile('./scraped.csv', finalArray.join("\n"), 'utf8', function(err){
      if (err){
        console.log("Error occured");
      } else{
        console.log("Success!");
      }
    });
  }
});









