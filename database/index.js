const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chonk2', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected!');
});

const chonkSchema = mongoose.Schema({
  id: { type: Number, unique: false, required: true },
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
  contact: {
    email: String,
    phone: String,
    address: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      postcode: String
    }
  }
});

const Chonk = mongoose.model('Chonk', chonkSchema);

module.exports = { Chonk, mongoose };
