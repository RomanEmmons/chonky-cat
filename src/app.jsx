import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: null,
      zipCodes: [],
      searching: false,
      cats: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loseFocus = this.loseFocus.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.className]: event.target.value, cats: null });
  }

  encodeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  handleSubmit(event) {
    // this.setState({ cats: '' });
    const cleanZip = this.encodeHTML(this.state.zip);
    //console.log(typeof this.state.zip);
    if (cleanZip === null || cleanZip.length !== 5) {
      alert('Please enter a valid zip code!');
    }
    if (cleanZip.length === 5) {
      $.ajax({
        method: 'GET',
        url: `http://localhost:3000/input/${cleanZip}`,
        success: (result) => {
          // console.log('result!', result);
          this.setState({ cats: result, searching: true });
        },
      });
    }
    event.preventDefault();
  }

  loseFocus() {
    document.getElementById('form').blur();
  }
  render() {
    return (
      <div>
        <div className="banner">
          <h1>Chonky Cat</h1>
          <div className="entry">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="label">
                <label>5 Digit Zip Code:</label>
              </div>
              <input
                className="zip"
                type="text"
                onClick={this.loseFocus}
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div>
            {this.state.searching === true ? (
              <h2>
                There are{' '}
                {this.state.cats === null ? 0 : this.state.cats.length} thicc
                hambs in your area!
              </h2>
            ) : null}
          </div>
        </div>

        {this.state.cats ? <List cats={this.state.cats} /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
