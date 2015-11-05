import React from 'react';
import { Link, IndexLink } from 'react-router';

const TitleBarStandard = React.createClass({

  _onTabClick(e) {
    Object.keys(this.refs).forEach(key => {
      let elem = this.refs[key];
      let classes = elem === e.currentTarget ? 'tab active' : 'tab';
      elem.className = classes;
    });
  },

  render() {
    return (
      <div>
        <a className='icon icon-more-vertical pull-right'></a>
        <h1 className='title'>AppName</h1>
        <table className='bar-tabs'>
          <tbody>
            <tr>
              <td className='tab active' ref='home' onClick={this._onTabClick}>
                <IndexLink to='/'>Home</IndexLink>
              </td>
              <td className='tab' ref='myMaps' onClick={this._onTabClick}>
                <Link to='/my-maps'>My Maps</Link>
              </td>
              <td className='tab' ref='about' onClick={this._onTabClick}>
                <Link to='/about'>About</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
		);
  }
});

module.exports = TitleBarStandard;
