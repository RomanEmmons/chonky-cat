const { keys } = require('../keys.js');
const { Client } = require('@petfinder/petfinder-js');
const { Chonk, mongoose } = require('../database/index.js');
const { scrape } = require('../scraper.js');

// run seed.js then closeConnection.js

const client = new Client({
  apiKey: `${keys.petfinderKey}`,
  secret: `${keys.petfinderSecret}`
});

let catsIds = [];

const createCollection = async () => {
  let catsArr = [];

  let page = 1;

  for (let i = page; i < 32; i++) {
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

  const insert = new Promise((resolve, reject) => {
    Chonk.insertMany(collection, (err, item) => {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      console.log('collection seeded');
      resolve();
    });
  });

  insert.then(results => {
    catsIds.forEach(id => {
      Chonk.find({ id: id }, (err, data) => {
        if (err) {
          console.log('err in Chonk.find: ', err);
        } else {
          console.log(data);
          let des = new Promise((resolve, reject) => {
            scrape(data[0].url, (err, result) => {
              //console.log('result; ', result);
              if (err) {
                console.log('err in scrape: ', err);
                reject(err);
              } else {
                console.log('result: ', result);
                resolve(result);
              }
            });
          });
          des
            .then(data => {
              console.log('data', data);
              if (data) {
                //   return Chonk.findOneAndUpdate(
                //     { id: id },
                //     { description: data }
                //   );
                // } else return;
                Chonk.findOneAndUpdate(
                  { id: id },
                  { description: data },
                  { upsert: true },
                  function(err, doc) {
                    if (err) return console.log('err in findOne', err);
                    return console.log('Succesfully saved.');
                  }
                );
              }
            })
            .catch(err => {
              console.log('err in des.then: ', err);
            })
            .then(updated => {
              console.log('updated', updated);
            });
        }
      });
    });
  });
};

save();
