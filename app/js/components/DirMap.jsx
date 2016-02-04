import React from 'react';
import openseadragon from 'openseadragon';
//actions
import UIActions from '../actions/UIActions';
import DirectionMapActions from '../actions/DirectionMapActions';

const DirMap = React.createClass({

  componentDidMount() {
    this.viewer = OpenSeadragon({
      id: 'img-viewer',
      prefixUrl: './controles/',
      tileSources: {
        type: 'image',
        url:  this.props.dirmap.url,
        buildPyramid: false
      }
    });
  },

  componentWillUnmount() {
    this.viewer.destroy();
    this.viewer = null;
  },

  _abort() {
    UIActions.toggleDirMap();
  },

  _save() {
    let {url, name} = this.props.dirmap;
    DirectionMapActions.saveDirMap(url, name);
  },

  render() {
    return (
    <div className='dirmap'>
      <div className='img-viewer' id='img-viewer'>
      </div>
      <div className='content-padded'>
        <button className='btn btn-flat pull-right' onClick={this._save}>Save</button>
        <button className='btn btn-flat pull-right' onClick={this._abort}>Abort</button>
      </div>
    </div>
    );
  }
});

module.exports = DirMap;
