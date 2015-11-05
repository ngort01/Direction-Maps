import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

let _enableSearch = false;

// the store
var UIStore = assign({}, EventEmitter.prototype, {
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
  }
});

UIStore.dispatchToken = AppDispatcher.register(action => {
  let items;

  switch (action.type) {

    case ActionTypes.TOGGLE_SEARCH:
      _enableSearch = !_enableSearch;
      UIStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = UIStore;
