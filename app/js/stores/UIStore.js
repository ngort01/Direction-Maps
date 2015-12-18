import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _enableSearch = false;
let _showDirMap = false;

// the store
const UIStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSearchStatus() {
    return _enableSearch;
  },

  getDirMapStatus() {
    return _showDirMap;
  }
});

UIStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {

    case ActionTypes.TOGGLE_SEARCH:
      _enableSearch = !_enableSearch;
      UIStore.emitChange();
      break;

    case ActionTypes.SHOW_SEARCH:
      _enableSearch = true;
      UIStore.emitChange();
      break;

    case ActionTypes.TOGGLE_DIR_MAP:
      _showDirMap = !_showDirMap;
      UIStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = UIStore;
