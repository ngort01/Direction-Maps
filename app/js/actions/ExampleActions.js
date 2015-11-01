import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {

  addItem(itemName) {
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_ITEM,
      newItem: itemName
    });
  },

  removeItem(itemName) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOVE_ITEM,
      item: itemName
    });
  }
};
