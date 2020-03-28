const { getZips } = require('./getZips.js');
const { Chonk, mongoose } = require('../database/index.js');

const SF = 94102;

const getCats = async (zip, res) => {
  const catsArr = [];
  const zipArr = new Promise((resolve, reject) => {
    resolve(getZips(zip));
  });

  return zipArr
    .then(async zips => {
      zips.push(zip);
      let data = await Promise.all(
        zips.map(async item => {
          let cat = Chonk.find({ 'contact.address.postcode': item });
          return await cat;
        })
      );

      data.forEach(item => {
        if (item.length == 1) {
          catsArr.push(item[0]);
        }
      });
      res.send(catsArr);
    })
    .catch(err => {
      return console.log('err: ', err);
    });
};

// getCats(zip).then(result => {
//   console.log('result fin', result);
//   return result;
// });

module.exports = getCats;
