import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import DirMapApi from '../webApi/DirMapApi';

module.exports = {

  getDirMap(lat, lng, type) {
    DirMapApi.getDirmap(lat, lng, type);
  }
};
