import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {

  toggleSearch() {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_SEARCH,
    });
  },

  toggleDirMap() {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_DIR_MAP,
    });
  }
};
