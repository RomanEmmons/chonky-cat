import React from 'react';
import { keys } from '../keys.js';
import CatFundamentals from './CatFundamentals.jsx';

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
        })}{' '}
        <div>
          <div id="about">
            {this.props.description ? (
              <p>{this.props.description}</p>
            ) : (
              <p>This chonk's story is a mystery!</p>
            )}
          </div>{' '}
          <CatFundamentals
            cat={this.props.cat}
            attributes={this.props.cat.attributes}
            breeds={this.props.cat.breeds}
            location={this.props.cat.contact.address.city}
            contact={this.props.cat.contact}
          />
        </div>
      </div>
    );
  }
}

export default Expanded;
