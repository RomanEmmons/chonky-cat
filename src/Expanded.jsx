import React from 'react';
const { keys } = require('../keys.js');
import { Client } from '@petfinder/petfinder-js';

const client = new Client({
  apiKey: `${keys.petfinderKey}`,
  secret: `${keys.petfinderSecret}`
});

class Expanded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('props in Expanded', this.props);
    client.animal
      .show(this.props.cat.id)
      .then(response => {
        console.log('id response', response);
        this.setState({ cat: response });
      })
      .catch(error => {
        // Handle the error
        console.log('error: ', error);
      })
      .then(response => {
        console.log(this.state.cat.data.animal.url);
        fetch(
          `http://ec2-54-67-5-147.us-west-1.compute.amazonaws.com
        :3001/description`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({ url: this.state.cat.data.animal.url })
          }
        )
          .then(result => {
            console.log('result', result);
            return result.json();
          })
          .then(response => {
            this.setState({ description: response });
            console.log('response', response);
          })
          .catch(err => {
            console.log('err: ', err);
          });
      });
  }

  render() {
    return (
      <div className="Expanded">
        <h1>{this.props.cat.name}</h1>
        {this.props.cat.photos.map((photo, i) => {
          return (
            <img key={i} className="fullSizePhotos" src={photo.large}></img>
          );
        })}
        {this.state.cat ? (
          <div>
            {this.state.description ? (
              <h3>{this.state.description}</h3>
            ) : (
              <h3>Sorry! This chonk's story is a mystery!</h3>
            )}
            {/* <h3>{this.state.description}</h3> */}

            <a href={this.state.cat.data.animal.url}>
              {this.state.cat.data.animal.url}
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Expanded;
