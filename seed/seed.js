const { keys } = require('../keys.js');
const { Client } = require('@petfinder/petfinder-js');
const { Chonk, mongoose } = require('../database/index.js');

const client = new Client({
  apiKey: `${keys.petfinderKey}`,
  secret: `${keys.petfinderSecret}`
});

let catsIds = [];

const createCollection = async () => {
  let catsArr = [];

  let page = 1;

  for (let i = page; i < 2; i++) {
    await client.animal
      .search({
        type: 'Cat',
        size: 'xlarge',
        page: i
      })
      .then(response => {
        response.data.animals.forEach(cat => {
          catsArr.push(cat);
          catsIds.push(cat.id);
        });
        console.log('page', page);
        //console.log('catsArr', catsArr[0].data.animals);
        page++;
      })
      .catch(error => {
        // Handle the error
        console.log('error: ', error);
      });
  }
  // console.log(
  //   'catsArr',
  //   catsArr,
  //   'catsArr.length',
  //   catsArr.length,
  //   'catsIds',
  //   catsIds
  // );

  let formattedArr = [];
  catsArr.forEach(cat => {
    const newChonk = new Chonk({
      id: cat.id,
      name: cat.name,
      age: cat.age,
      url: cat.url,
      breeds: {
        primary: cat.breeds.primary,
        secondary: cat.breeds.secondary,
        mixed: cat.breeds.mixed
      },
      gender: cat.gender,
      attributes: {
        spayed_neutered: cat.attributes.spayed_neutered,
        house_trained: cat.attributes.house_trained,
        declawed: cat.attributes.declawed,
        shots_current: cat.attributes.shots_current,
        special_needs: cat.attributes.special_needs
      },
      description: cat.description,
      photos: cat.photos.map(obj => {
        return obj.medium;
      }),
      videos: cat.videos[0],
      contact: {
        email: cat.contact.email,
        phone: cat.contact.phone,
        address: {
          address1: cat.contact.address.address1,
          address2: cat.contact.address.address2,
          city: cat.contact.address.city,
          postcode: cat.contact.address.postcode
        }
      }
    });
    formattedArr.push(newChonk);
  });
  console.log('formattedArr', formattedArr);

  return formattedArr;
};

const save = async () => {
  await Chonk.deleteMany({}, err => {
    if (err) {
      console.log('err clearing db before seeding: ', err);
    } else {
      console.log('db cleared before seeding');
    }
  });

  const collection = await createCollection();

  await Chonk.insertMany(collection, (err, item) => {
    if (err) {
      return console.log('err', err);
    }
    console.log('collection seeded');
    mongoose.connection.close();
    console.log('db closed!');
    return;
  });
};

save();
