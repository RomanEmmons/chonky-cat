import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import List from './List.jsx';
import ListItem from './ListItem.jsx';

class CatCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: this.props.cats
    };
  }

  render() {
    return (
      <Carousel showThumbs={false}>
        {this.props.cats.length > 0
          ? this.props.cats.map(cat =>
              cat.photos.length > 0 ? <ListItem key={cat.id} cat={cat} /> : null
            )
          : null}
      </Carousel>
    );
  }
}
export default CatCarousel;

{
  /* <div>
<img src="assets/1.jpeg" />
<p className="legend">Legend 1</p>
</div>
<div>
<img src="assets/2.jpeg" />
<p className="legend">Legend 2</p>
</div>
<div>
<img src="assets/3.jpeg" />
<p className="legend">Legend 3</p>
</div> */
}
