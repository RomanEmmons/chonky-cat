import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './List.jsx';
import { keys } from '../keys.js';
import { Client } from '@petfinder/petfinder-js';

const client = new Client({
  apiKey: `${keys.petfinderKey}`,
  secret: `${keys.petfinderSecret}`
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: null,
      zipCodes: [],
      chonkFree: false,
      cats: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.className]: event.target.value, cats: null });
  }

  checkForPhotos(array) {
    let storeArr = [];
    array.forEach(item => {
      if (item.photos[0] && item.photos[0].medium) {
        storeArr.push(item);
      }
    });
    return storeArr;
  }

  componentDidUpdate() {
    console.log('this.state.zipCodes', this.state.zipCodes);
  }

  handleSubmit(event) {
    // this.setState({ cats: '' });
    if (this.state.zip === null || this.state.zip.length !== 5) {
      alert('Please enter a valid zip code!');
    }
    if (this.state.zip.length === 5) {
      // client.animal
      //   .search({
      //     type: 'Cat',
      //     size: 'xlarge',
      //     location: `${this.state.zip}`
      //   })
      console.log('about to fetch: ', this.state.zip);
      fetch(
        `https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/XmgA1EAKqMRmgrtcjjE5sqYPGUWxx8RQJpvZWh5yfoEqTl2eN9HIfS1xw3dAANyc/radius.json/${this.state.zip}/50/mile`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let zipArr = [];
          console.log('data', data);

          // format zipcode data and setState
        })
        .catch(error => {
          // Handle the error
          console.log('error: ', error);
        });
    } else if (this.state.zip === null || this.state.zip.length !== 5) {
      alert('Please enter a valid zip code!');
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="banner">
          <h1>Chonky Cat</h1>
          <div className="entry">
            <form onSubmit={this.handleSubmit}>
              <div className="label">
                <label>5 Digit Zip Code:</label>
              </div>
              <input className="zip" type="text" onChange={this.handleChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div>
            <h2>
              There are {this.state.cats === null ? 0 : this.state.cats.length}{' '}
              thicc hambs in your area!
            </h2>
          </div>
        </div>

        {this.state.cats ? <List cats={this.state.cats} /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
