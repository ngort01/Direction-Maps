import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {

  setDestination(dest) {

    AppDispatcher.dispatch({
      type: ActionTypes.SET_DESTINATION,
      dest: dest
    });
  }
};
