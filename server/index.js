var express = require('express');
var bodyParser = require('body-parser');
const { scrape } = require('../scraper.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/description', (req, res) => {
  console.log('req.body', req.body.url);
  scrape(req.body.url, (err, result) => {
    if (err) {
      console.log('err in post callback: ', err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port  3000!');
});
