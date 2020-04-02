import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import CatFundamentals from './CatFundamentals.jsx';
import Expanded from './Expanded.jsx';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const expand = this.state.expand === true ? false : true;
    this.setState({ expand: expand });
  }

  render() {
    return (
      <div>
        {this.state.expand === false ? (
          <div onClick={this.onClick} className="ListItemSmall">
            <div>
              <h2>{this.props.cat.name}</h2>
            </div>
            <div>
              <img className="thumbnail" src={`${this.props.cat.photos[0]}`} />
            </div>
          </div>
        ) : (
          <div className="Expanded">
            <h1>{this.props.cat.name}</h1>
            <div>
              {this.props.cat.photos.map((photo, i) => {
                return (
                  <img key={i} className="fullSizePhotos" src={photo}></img>
                );
              })}{' '}
            </div>
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
        )}
      </div>
    );
  }
}

export default ListItem;
