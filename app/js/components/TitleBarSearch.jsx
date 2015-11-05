import React from 'react';
import { Link, IndexLink } from 'react-router';
//actions
import UIActions from '../actions/UIActions';

const TitleBarSearch = React.createClass({

  componentDidMount() {
    this.refs.searchInput.focus();
  },

  _onTabClick(e) {
    Object.keys(this.refs)
      .filter(key => key !== 'searchInput')
        .forEach(key => {
          let elem = this.refs[key];
          let classes = elem === e.currentTarget ? 'tab active' : 'tab';
          elem.className = classes;
        });
  },

  _closeSearch() {
    UIActions.toggleSearch();
  },

  _clearInput() {
    this.refs.searchInput.value = '';
  },

  render() {
    return (
      <div className='searchbar'>
        <div className='header'>
          <a
            className='icon icon-left-nav pull-left'
            onClick={this._closeSearch}
          />
          <input
            className='searchbox'
            type='text'
            placeholder='Search'
            ref='searchInput'
          />
          <a
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
              <td className='tab' ref='car' onClick={this._onTabClick}>
                <span className='icon icon-car'/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
		);
  }
});

module.exports = TitleBarSearch;
