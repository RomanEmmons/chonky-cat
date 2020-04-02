const { Chonk, mongoose } = require('../database/index.js');

mongoose.connection.close();
console.log('db closed!');
