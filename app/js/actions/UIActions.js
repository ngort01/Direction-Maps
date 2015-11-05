import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {

  toggleSearch() {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_SEARCH,

    });
  }
};
