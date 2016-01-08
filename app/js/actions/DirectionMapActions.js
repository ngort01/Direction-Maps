import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import DirMapApi from '../utils/DirMapApi';
import FileSaver from 'filesaver.js';
import DeviceFileSaver from '../utils/DeviceFileSaver';
import {base64toBlob} from '../utils/utils';

module.exports = {

  getDirMap(lat, lng, type, name) {
    DirMapApi.getDirmap(lat, lng, type, name);
  },

  saveDirMap(dirMap, name) {
    if (!window.cordova) {
      let blob = this.base64toBlob(dirMap, 'image/png');
      FileSaver.saveAs(blob, name + '.png');
    } else {
      DeviceFileSaver.DownloadFile(dirMap, 'DirMaps', name);
    }
  },

  setCurrentDirMap(key) {
    AppDispatcher.dispatch({
      type: ActionTypes.SET_CURRENT_DIRMAP,
      key: key
    });
  },

  deleteDirMap(key, url) {
    DeviceFileSaver.deleteFile(url);
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_DIRMAP,
      key: key
    });
  }
};
