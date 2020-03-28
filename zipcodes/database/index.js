var mysql = require('mysql');

var connection = mysql.createConnection({
  // host: 'ec2-13-52-238-58.us-west-1.compute.amazonaws.com',
  // port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'Fila',
  database: 'zips'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;
