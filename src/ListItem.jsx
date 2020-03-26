import React from 'react';
import Expanded from './Expanded.jsx';
const { keys } = require('../keys.js');
import { Client } from '@petfinder/petfinder-js';

const client = new Client({
  apiKey: `${keys.petfinderKey}`,
  secret: `${keys.petfinderSecret}`
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log('props in ListItem', this.props);
    client.animal
      .show(this.props.cat.id)
      .then(response => {
        // console.log('id response', response);
        this.setState({ cat: response });
      })
      .catch(error => {
        // Handle the error
        console.log('error: ', error);
      })
      .then(response => {
        console.log(this.props.cat.url);
        fetch(
          // `http://ec2-54-67-5-147.us-west-1.compute.amazonaws.com:3000/description`,
          'http://localhost:3000/description',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({ url: this.props.cat.url })
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
              <img
                className="thumbnail"
                src={`${this.props.cat.photos[0].medium}`}
              />
            </div>
          </div>
        ) : (
          <Expanded description={this.state.description} cat={this.props.cat} />
        )}
      </div>
    );
  }
}

export default ListItem;
