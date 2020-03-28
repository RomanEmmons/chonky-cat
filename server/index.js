var express = require('express');
var bodyParser = require('body-parser');
const db = require('../database/index.js');
const { scrape } = require('../scraper.js');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/:zip', (req, res) => {
  console.log('req.params', req.params);
  // `https://www.zipcodeapi.com/rest/XmgA1EAKqMRmgrtcjjE5sqYPGUWxx8RQJpvZWh5yfoEqTl2eN9HIfS1xw3dAANyc/radius.json/${this.state.zip}/90/mile`
  res.send('got it!');
});

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
