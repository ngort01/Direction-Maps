import React from 'react';
import openseadragon from 'openseadragon';
//actions
import UIActions from '../actions/UIActions';

const DirMap = React.createClass({

  componentDidMount() {
    let viewer = OpenSeadragon({
      id: 'img-viewer',
      prefixUrl: './images/',
      tileSources: {
        type: 'image',
        url:  require('../../assets/map.jpg'),
        buildPyramid: false
      }
    });
  },

  _onClick() {
    UIActions.toggleDirMap();
  },

  render() {
    return (
    <div className='dirmap'>
      <div className='img-viewer' id='img-viewer'>
      </div>
      <div className='content-padded'>
        <button className='btn btn-flat pull-right' onClick={this._onClick}>Save</button>
        <button className='btn btn-flat pull-right' onClick={this._onClick}>Abort</button>
      </div>
    </div>
    );
  }
});

module.exports = DirMap;
