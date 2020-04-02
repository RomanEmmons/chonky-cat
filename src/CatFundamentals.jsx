import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

class CatFundamentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let innerArr = [];
    let outerArr = [];
    let props1 = this.props.cat;
    let props2 = this.props.attributes;
    let props3 = this.props.breeds;
    let props4 = this.props.contact.address;
    let props5 = this.props.contact;
    let store = [
      { key: 'age', label: 'Age', value: '' },
      { key: 'gender', label: 'Gender', value: '' },
      { key: 'declawed', label: 'Declawed', value: '' },
      { key: 'house_trained', label: 'House Trained', value: '' },
      { key: 'shots_current', label: 'Shots Current', value: '' },
      {
        key: 'spayed_neutered',
        label: 'Spayed/Neutered',
        value: ''
      },
      { key: 'special_needs', label: 'Special Needs', value: '' },
      { key: 'primary', label: 'Breed', value: '' },
      { key: 'city', label: 'Location', value: '' },
      { key: 'phone', label: 'Phone', value: '' },
      { key: 'email', label: 'Email', value: '' }
    ];
    // assign values based on props
    for (let i = 0; i < store.length; i++) {
      for (let key in props1) {
        if (store[i].key === key) {
          store[i].value = props1[key];
          break;
        }
      }
      for (let key in props2) {
        if (store[i].key === key) {
          store[i].value = props2[key];
          if (store[i].value === false) {
            store[i].value = 'No';
          }
          if (store[i].value === true) {
            store[i].value = 'Yes';
          }
          break;
        }
      }
      for (let key in props3) {
        if (store[i].key === key) {
          store[i].value = props3[key];
          break;
        }
      }
      for (let key in props4) {
        if (store[i].key === key) {
          store[i].value = props4[key];
          break;
        }
      }
      for (let key in props5) {
        if (store[i].key === key) {
          store[i].value = props5[key];
          break;
        }
      }
      // split into arrays for table rows
      innerArr.push(store[i]);
      if (i === 2 || i === 5 || i === 8 || i === 10) {
        outerArr.push(innerArr);
        innerArr = [];
      }
    }
    store = outerArr;
    // console.log('Store', store);
    this.setState({ store });
  }

  render() {
    const questionMark = '?';
    return (
      <table className="table">
        <thead></thead>
        <tbody className="table">
          {this.state.store ? (
            // map rows
            this.state.store.map((row, i) => {
              return (
                <tr className="row" key={i}>
                  {// map cells
                  row.map((cell, j) => {
                    return (
                      <td className="cell" key={j}>
                        <span className="bold">{cell.label}:</span>
                        <br></br>

                        {cell.value === null ? (
                          questionMark
                        ) : cell.value.length > 0 ? (
                          cell.value === this.props.contact.email ? (
                            <a href={'mailto:' + cell.value}>{cell.value}</a>
                          ) : (
                            cell.value
                          )
                        ) : (
                          questionMark
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default CatFundamentals;
