const request = require('request');
const cheerio = require('cheerio');

// const scrape = url => {
//   request(url, (err, resp, body) => {
//     if (err) {
//       console.log('err: ', err);
//     }
//     $ = cheerio.load(body);
//     // console.log(body);

//     let data = $(' div.u-vr4x ')
//       .text()
//       .split('  ');
//     // console.log('data', data);
//     let storeArr = [];
//     data.forEach(string => {
//       if (string.length > 100) {
//         // console.log('string', string);
//         storeArr.push(string);
//       }
//     });
//     return storeArr[0];
//   });
// };

const scrape = (url, callback) => {
  request(url, (err, resp, body) => {
    if (err) {
      console.log('err: ', err);
    }
    $ = cheerio.load(body);
    // console.log(body);

    let data = $(' div.u-vr4x ')
      .text()
      .split('  ');
    console.log('data', data);
    let storeArr = [];
    data.forEach(string => {
      if (string.length > 50) {
        // console.log('string', string);
        storeArr.push(string);
      }
    });
    console.log('storeArr', storeArr[0]);
    return callback(null, storeArr[0]);
  });
};

// scrape(
//   'https://www.petfinder.com/cat/poppy-47642871/ca/riverside/mary-s-roberts-pet-adoption-center-ca216/?referrer_id=5e459d98-9545-4fde-a41f-73055b173973'
// );

module.exports = { scrape };
