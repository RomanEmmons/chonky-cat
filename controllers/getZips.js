const db = require('../zipCodes/database/index.js');

const SF = 94102;

const getZips = async (inputZip, callback) => {
  inputZip = JSON.stringify(inputZip);
  const radius = 150;

  // find latitude and longitude of input
  const inputLatLng = await new Promise((resolve, reject) => {
    db.query(
      `SELECT lat, lng FROM codes WHERE zip=${inputZip};`,
      (err, result) => {
        if (err) {
          reject(console.log('err in getInputLatAndLng: ', err));
        } else {
          resolve(result);
        }
      }
    );
  });

  // get zips within 90 miles from db
  const codesJSON = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM codes  WHERE (3958*3.1415926*sqrt((lat-'${inputLatLng[0].lat}')*(lat-${inputLatLng[0].lat}) + cos(lat/57.29578)*cos(${inputLatLng[0].lat}/57.29578)*(lng-${inputLatLng[0].lng})*(lng-${inputLatLng[0].lng}))/180) <= ${radius};`,
      (err, result) => {
        if (err) {
          reject(console.log('err getting codes: ', err));
        } else {
          resolve(result);
        }
      }
    );
  });

  const codesArr = codesJSON.map(zipObj => {
    return JSON.parse(zipObj.zip);
  });

  // console.log('codesArr', codesArr);
  return codesArr;
};

// getZips(SF);

module.exports = { getZips };
