var express = require('express');
var bodyParser = require('body-parser');
const db = require('../database/index.js');
const { scrape } = require('../scraper.js');
const app = express();
const cors = require('cors');
const getCats = require('../controllers/getCats.js');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/input/:zip', async (req, res) => {
  const zip = JSON.parse(req.params.zip);
  getCats(zip, res);
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
