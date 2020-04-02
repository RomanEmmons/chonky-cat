import React from 'react';
import CatFundamentals from './CatFundamentals.jsx';
import { Carousel } from 'react-responsive-carousel';

class Expanded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Expanded">
        <h1>{this.props.cat.name}</h1>
        <div>
          <Carousel showThumbs={false} dynamicHeight={true} width="auto">
            {this.props.cat.photos.map((photo, i) => {
              return (
                <div>
                  <img key={i} className="fullSizePhotos" src={photo}></img>
                </div>
              );
            })}{' '}
          </Carousel>
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
    );
  }
}

{
  /* <div>
<p>Age: {this.props.cat.age}</p>
<p>Gender: {this.props.cat.gender}</p>
<p>Declawed: {this.props.cat.attributes.declawed}</p>
<p>House Trained: {this.props.cat.attributes.house_trained}</p>
<p>Shots Current: {this.props.cat.attributes.shots_current}</p>
</div>
<div>
<p>Spayed/Neutered: {this.props.cat.attributes.spayed_neutered}</p>
<p>Special Needs: {this.props.cat.attributes.special_needs}</p>
<p>Breed: {this.props.cat.breeds.primary}</p>
<p>Location: {this.props.cat.contact.address.city}</p>
<p>Email: {this.props.cat.contact.email}</p>
</div>
<p>Phone: {this.props.cat.contact.phone}</p> */
}
export default Expanded;
