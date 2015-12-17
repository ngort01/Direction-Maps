import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _geocodeResult = {};

// the store
const GeocodeStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getGeocodeResult() {
    return _geocodeResult;
  }
});

GeocodeStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {

    case ActionTypes.GEOCODE:
      _geocodeResult = JSON.parse(action.result);
      GeocodeStore.emitChange();
      break;

    case ActionTypes.CLEAR_GEOCODE_RESULT:
      _geocodeResult = {};
      GeocodeStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = GeocodeStore;
