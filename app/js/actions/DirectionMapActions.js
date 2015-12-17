import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {

  getDirMap(lat, lng, type) {
    //'http://fiddle.jshell.net/favicon.png'
    AppDispatcher.dispatch({
      type: ActionTypes.GET_DIR_MAP,
    });
  }
};
