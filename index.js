var repl = require('repl');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://substack.net/images/';


request.get(url, function(error, response, html){
  if(!error && response.statusCode === 200){
    $ = cheerio.load(html);
    finalArray = [];
    formatStrings();
    writeToCSV();
  }
});


function writeToCSV()  {
    fs.writeFile('./scraped.csv', finalArray.join("\n"), 'utf8', function(err){
    if (err){
      console.log("Error occured");
    } else{
      console.log("Success!");
    }
  });
}

function formatStrings() {
    $('tr').filter(function(){
    permit = $(this).children().first().children().text();
    urlPath = $(this).children().last().children().attr("href");    // refactor so that instead of undefined, says directory
    if ($(this).children().last().children().text().split('.')[1]===undefined){
      extension = "directory";
    }else {
      extension = "." + $(this).children().last().children().text().split('.')[1];
    };

    var csvString = permit + "," + (url + urlPath) + "," + extension;
    finalArray.push(csvString);
  });
}






