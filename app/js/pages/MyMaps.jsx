import React from 'react';
// actions
import DirectionMapActions from '../actions/DirectionMapActions';
import UIActions from '../actions/UIActions';
// stores
import DirMapStore from '../stores/DirMapStore';

const MyMaps = React.createClass({

  getInitialState() {
    return {
      myDirMaps: DirMapStore.getMyDirMaps()
    };
  },

  componentDidMount() {
    DirMapStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    DirMapStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      myDirMaps: DirMapStore.getMyDirMaps()
    });
  },

  _open(key, e) {
    console.log('open');
    DirectionMapActions.setCurrentDirMap(key);
    UIActions.toggleDirMap();
  },

  _delete(key, url, e) {
    console.log('delete');
    e.stopPropagation();
    DirectionMapActions.deleteDirMap(key, url);
  },

  render() {
    let {myDirMaps} = this.state;
    let elems = [];

    Object.keys(myDirMaps).forEach(key => {
      let dirMap = myDirMaps[key];
      elems.push(
        <li className='table-view-cell media' key={key} onClick={this._open.bind(null, key)}>
          <a>
            <img className='media-object pull-left' src={dirMap.url}/>
            <span className='icon icon-close pull-right' onClick={this._delete.bind(null, key, dirMap.url)}/>
            <div className='media-body'>
              {dirMap.name}
            </div>
          </a>
        </li>
      );
    });

    return (
      <div className='my-maps'>
        <ul className='table-view'>
          {elems.length ? elems : <p>No Direction Maps stored!</p>}
        </ul>
      </div>
    );
  }
});

module.exports = MyMaps;
