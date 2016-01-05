import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _status;
let _current_dirmap = {
  name: 'test',
  url: require('../../assets/map.jpg')
};

if (!window.localStorage.myDirMaps) {
  window.localStorage.myDirMaps = JSON.stringify({});
}

// the store
const DirMapStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getStatus() {
    return _status;
  },

  getCurrentDirMap() {
    return _current_dirmap;
  },

  getMyDirMaps() {
    return JSON.parse(window.localStorage.myDirMaps);
  }
});

DirMapStore.dispatchToken = AppDispatcher.register(action => {
  let myDirMaps;

  switch (action.type) {
    case ActionTypes.REQUESTING:
      _status = 'requesting';
      DirMapStore.emitChange();
      break;

    case ActionTypes.REQUEST_FAIL:
      _status = 'request_fail';
      DirMapStore.emitChange();
      break;

    case ActionTypes.REQUEST_SUCCESS:
      _status = 'request_success';
      _current_dirmap.url = action.url;
      _current_dirmap.name = action.name;
      DirMapStore.emitChange();
      break;

    case ActionTypes.SAVE_DIRMAP:
      let {dirMap, name} = action;
      myDirMaps = JSON.parse(window.localStorage.myDirMaps);
      myDirMaps[name] = {};
      myDirMaps[name].url = dirMap;
      myDirMaps[name].name = name;
      window.localStorage.myDirMaps = JSON.stringify(myDirMaps);
      DirMapStore.emitChange();
      break;

    case ActionTypes.SET_CURRENT_DIRMAP:
      myDirMaps = JSON.parse(window.localStorage.myDirMaps);
      _current_dirmap = myDirMaps[action.key];
      DirMapStore.emitChange();
      break;

    case ActionTypes.DELETE_DIRMAP:
      myDirMaps = JSON.parse(window.localStorage.myDirMaps);
      delete myDirMaps[action.key];
      window.localStorage.myDirMaps = JSON.stringify(myDirMaps);
      DirMapStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = DirMapStore;
