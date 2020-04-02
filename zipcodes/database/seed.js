const db = require('./index.js');
const execSQL = require('exec-sql');
const path = require('path');
const fs = require('fs');
const connection = require('./index.js');

const schemaInitiate = async () => {
  execSQL.connect({
    database: 'zips',
    user: 'root',
    password: 'Fila'
  });

  await new Promise((resolve, reject) => {
    execSQL.executeFile(path.join(__dirname, '/schema.sql'), function(err) {
      if (err) {
        console.log('err in execSql preSchema: ', err);
      } else {
        execSQL.disconnect();
        resolve(console.log('schema done!'));
      }
    });
  });
};

//schemaInitiate();

const sync = async () => {
  await new Promise((resolve, reject) => {
    db.query(
      `LOAD DATA LOCAL INFILE  '/Users/roman/Documents/chonky-cat/zipcodes/uszips.csv' INTO TABLE codes FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES (zip, lat, lng);`,
      (err, results) => {
        if (err) {
          console.log('err:', err);
          reject(err);
        } else {
          resolve(console.log('no err, results from events query:', results));
        }
      }
    );
  });
};

//sync();

const seed = async () => {
  await schemaInitiate();
  sync().then(connection.end());
};
// /Users/roman/Documents/chonky-cat/zipcodes/uszips.csv

seed();
