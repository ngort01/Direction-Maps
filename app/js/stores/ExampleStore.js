import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

let _example_items = [
    {name: 'item1'},
    {name: 'item2'},
    {name: 'item3'}
  ];

if (!window.localStorage.items) {
  window.localStorage.items = JSON.stringify(_example_items);
}

// the store
var ExampleStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getItems() {
    return JSON.parse(window.localStorage.items);
  },

});

ExampleStore.dispatchToken = AppDispatcher.register(action => {
  let items;

  switch (action.type) {

    case ActionTypes.ADD_ITEM:
      let newItem = action.newItem;
      items = JSON.parse(window.localStorage.items);
      items.push({'name': newItem});
      window.localStorage.items = JSON.stringify(items);
      ExampleStore.emitChange();
      break;

    case ActionTypes.REMOVE_ITEM:
      let removedItem = action.item;
      items = JSON.parse(window.localStorage.items);
      items = items.filter(item => {
        return item.name != removedItem;
      });
      window.localStorage.items = JSON.stringify(items);
      ExampleStore.emitChange();
      break;

    default:
    // do nothing
  }
});

module.exports = ExampleStore;
