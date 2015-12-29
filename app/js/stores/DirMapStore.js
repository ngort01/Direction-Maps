import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _status;

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
  }
});

DirMapStore.dispatchToken = AppDispatcher.register(action => {

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
      DirMapStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = DirMapStore;
