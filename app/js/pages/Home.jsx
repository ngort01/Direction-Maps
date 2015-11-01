import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// components
import MapView from '../components/MapView';

const Home = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <div className='home'>
        <MapView />
        <button className='btn btn-float icon icon-search'/>
      </div>
    );
  }
});

module.exports = Home;
