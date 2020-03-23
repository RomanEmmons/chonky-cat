import React from 'react';
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
              <img
                className="thumbnail"
                src={`${this.props.cat.photos[0].medium}`}
              />
            </div>
          </div>
        ) : (
          <Expanded cat={this.props.cat} />
        )}
      </div>
    );
  }
}

export default ListItem;
