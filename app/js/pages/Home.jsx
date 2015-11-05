import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
//actions
import UIActions from '../actions/UIActions';
// components
import MapView from '../components/MapView';

const Home = React.createClass({

  mixins: [PureRenderMixin],

  _enableSearch() {
    UIActions.toggleSearch();
  },

  render() {
    return (
      <div className='home'>
        <MapView />
        <button
					className='btn btn-float icon icon-search'
					onClick={this._enableSearch}
        />
      </div>
    );
  }
});

module.exports = Home;
