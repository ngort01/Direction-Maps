import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {
  getDirmap() {
    AppDispatcher.dispatch({
      type: ActionTypes.REQUESTING
    });

    setTimeout(() => {
      AppDispatcher.dispatch({
        type: ActionTypes.REQUEST_SUCCESS,
      });
      AppDispatcher.dispatch({
        type: ActionTypes.TOGGLE_SEARCH,
      });
      AppDispatcher.dispatch({
        type: ActionTypes.TOGGLE_DIR_MAP,
      });
    }, 5000);

  }
};
