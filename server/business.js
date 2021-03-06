var jsonfile = require('jsonfile');
var file='./server/json/business.json';
var request = require('request');
var shuffles=require('./provider/shuffleprovider.js');
var obj;
 
var newssites=['https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
'https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=https://newsapi.org/v1/articles?source=mashable&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
'https://newsapi.org/v1/articles?source=handelsblatt&sortBy=latest&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
'https://newsapi.org/v1/articles?source=die-zeit&sortBy=latest&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
' https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e',
'https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e'
]

var data=[];
var articles=[];

newssites.forEach(function(url)
{
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    data.push(JSON.parse(body));

   for(let i=0;i<data.length;i++)
     {
       data[i].articles.forEach(function(array)
       {
            array.source=data[i].source
       }
       )

     articles=articles.concat(data[i].articles);
     }

     articles=shuffles.doShuffle(articles);

  jsonfile.writeFile(file,articles, function (err) {
  console.error(err)
   })
  }
})
})

