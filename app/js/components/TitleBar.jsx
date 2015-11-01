import React from 'react';
import { Link, IndexLink } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// fixed bar at the top of the site
const TitleBar = React.createClass({

  mixins: [PureRenderMixin],

  _onClick(e) {
    Object.keys(this.refs).forEach(key => {
      let elem = this.refs[key];
      if (elem === e.currentTarget) {
        e.currentTarget.className = 'tab active';
      } else {
        elem.className = 'tab';
      }
    });
  },

  render() {

    return (
      <header className='bar bar-nav'>
        <a className='icon icon-more-vertical pull-right'></a>
        <h1 className='title'>AppName</h1>
        <table className='bar-tabs'>
          <tbody>
            <tr>
              <td className='tab active' ref='home' onClick={this._onClick}>
                <IndexLink to='/'>Home</IndexLink>
              </td>
              <td className='tab' ref='myMaps' onClick={this._onClick}>
                <Link to='/my-maps'>My Maps</Link>
              </td>
              <td className='tab' ref='about' onClick={this._onClick}>
                <Link to='/about'>About</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    );
  }
});

module.exports = TitleBar;
