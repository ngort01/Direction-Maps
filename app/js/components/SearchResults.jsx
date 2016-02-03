import React from 'react';
// actions
import DestinationActions from '../actions/DestinationActions';
import GeocodeActions from '../actions/GeocodeActions';

const SearchResults = React.createClass({

  _onClick(i, e) {
    let {features} = this.props.geoCodeResults;
    let dest = features[i];
    let d = {
      name: dest.properties.name,
      city: dest.properties.city,
      state: dest.properties.state,
      lat: dest.geometry.coordinates[1],
      lng: dest.geometry.coordinates[0]
    };
    DestinationActions.setDestination(d);
    this.props.setInputState(d.name + ', ' + d.city);
    setTimeout(() => GeocodeActions.clear(), 100);
  },

  render() {
    let {features} = this.props.geoCodeResults;
    let results = [];
    if (features) {
      features.forEach((f, i) => {
        let props = f.properties;
        let name  = props.name + ', ';
        let city = props.city ? props.city : '';
        let state = props.state;
        results.push(
          <li key={i} index={i} onClick={this._onClick.bind(this, i)}>
            {name + city}
          </li>
        );
      });
    }

    return (
      <ul className='search-results'>
        {results}
      </ul>
    );
  }
});

module.exports = SearchResults;
