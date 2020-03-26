const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chonk', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected!');
});

const chonkSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  age: String,
  url: String,
  breeds: { primary: String, secondary: String, mixed: Boolean },
  gender: String,
  attributes: {
    spayed_neutered: Boolean,
    house_trained: Boolean,
    declawed: Boolean,
    shots_current: Boolean,
    special_needs: Boolean
  },
  description: String,
  photos: [String],
  videos: String,
  contact: {
    email: String,
    phone: String,
    address: {
      address1: String,
      address2: String,
      city: String,
      postcode: String
    }
  }
});

const Chonk = mongoose.model('Chonk', chonkSchema);

// console.log('Chonk', Chonk);

// const insertChonk = () => {
//   Chonk.save({ id: 1, name: 'Roman' })
//     .then(result => {
//       console.log('saved!', result);
//     })
//     .catch(err => {
//       console.log('err:', err);
//     });
// };

// insertChonk();

module.exports = { Chonk, mongoose };
