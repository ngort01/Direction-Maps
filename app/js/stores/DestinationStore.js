import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _destination = {
  lat: 51.964711,
  lng: 7.628496,
  name: '',
  city: '',
  state: ''
};

// the store
const DestinationStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getDestination() {
    return _destination;
  }
});

DestinationStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case ActionTypes.SET_DESTINATION:
      _destination = action.dest;
      DestinationStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = DestinationStore;
