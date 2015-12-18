import React from 'react';
import { Link, IndexLink } from 'react-router';
//actions
import UIActions from '../actions/UIActions';
import GeocodeActions from '../actions/GeocodeActions';
import DirectionMapActions from '../actions/DirectionMapActions';
// components
import SearchResults from './SearchResults';

const TitleBarSearch = React.createClass({

  getInitialState() {
    return {
      value: '',
      transportationType: 'car'
    };
  },

  componentDidMount() {
    this.refs.searchInput.focus();
  },

  /*componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.destination && Object.keys(nextProps.destination).length) {
      this.setState({
        value: nextProps.destination.name
      });
    }
  },*/

  _onTabClick(e) {
    Object.keys(this.refs)
      .filter(key => key !== 'searchInput')
        .forEach(key => {
          let elem = this.refs[key];
          let classes;
          if (elem === e.currentTarget) {
            classes = 'tab active';
            this.setState({
              transportationType: key
            });
          } else {
            classes = 'tab';
          }
          elem.className = classes;
        });
  },

  _closeSearch() {
    UIActions.toggleSearch();
  },

  _clearInput() {
    this.setState({
      value: ''
    });
    GeocodeActions.clear();
  },

  _geocode(e) {
    let queryTerm = e.target.value;
    this.setState({
      value: queryTerm
    });
    if (queryTerm.length > 3) {
      GeocodeActions.geocode(queryTerm);
    }
  },

  _getDirMap() {
    let {destination} = this.props;
    let {transportationType} = this.state;
    if (window.cordova) {
      cordova.plugins.Keyboard.close();
    }
    //DirectionMapActions.getDirMap(destination.lat, destination.lng, transportationType);
    UIActions.toggleDirMap();
    UIActions.toggleSearch();
  },

  _setInputState(state) {
    this.setState({
      value: state
    });
  },

  render() {
    let {value} = this.state;
    let {geoCodeResults, destination} = this.props;
    let results = (geoCodeResults.features && geoCodeResults.features.length !== 0) ? true : false;

    return (

      <div className='searchbar'>
        <div className='header'>
          <span
            className='icon icon-left-nav pull-left'
            onClick={this._closeSearch}
          />
          <input
            className='searchbox'
            type='text'
            placeholder='Search'
            ref='searchInput'
            value={value}
            onChange={this._geocode}
          />
          <span
            className='icon icon-close pull-right'
            onClick={this._clearInput}
          />
        </div>

        <table className='bar-tabs'>
          <tbody>
            <tr>
              <td className='tab' ref='pedestrian' onClick={this._onTabClick}>
                <span className='icon icon-pedestrian'/>
              </td>
              <td className='tab' ref='bike' onClick={this._onTabClick}>
                <span className='icon icon-bike'/>
              </td>
              <td className='tab active' ref='car' onClick={this._onTabClick}>
                <span className='icon icon-car'/>
              </td>
            </tr>
          </tbody>
        </table>
        <span className='go'>
          Generate Map
          <span className='icon icon-arrow_right pull-right' onClick={this._getDirMap}/>
        </span>

        {results ? <SearchResults geoCodeResults={geoCodeResults}
                    setInputState={this._setInputState}/> : null}
      </div>
    );
  }
});

module.exports = TitleBarSearch;
