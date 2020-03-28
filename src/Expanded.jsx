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

  render() {
    return (
      <div className="Expanded">
        <h1>{this.props.cat.name}</h1>
        {this.props.cat.photos.map((photo, i) => {
          return <img key={i} className="fullSizePhotos" src={photo}></img>;
        })}
        <div>
          {this.props.description ? (
            <h3>{this.props.description}</h3>
          ) : (
            <h3>Sorry! This chonk's story is a mystery!</h3>
          )}

          <a href={this.props.cat.url}>{this.props.cat.url}</a>
        </div>
        )}
      </div>
    );
  }
}

export default Expanded;
