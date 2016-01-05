import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import DirMapApi from '../utils/DirMapApi';
import FileSaver from 'filesaver.js';
import DeviceFileSaver from '../utils/DeviceFileSaver';

module.exports = {

  _base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 1024;
    let byteCharacters = atob(base64Data.split(',')[1]);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);

      let bytes = new Array(end - begin);
      for (let offset = begin, i = 0 ; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {type: contentType});
  },

  getDirMap(lat, lng, type, name) {
    DirMapApi.getDirmap(lat, lng, type, name);
  },

  saveDirMap(dirMap, name) {
    if (!window.cordova) {
      let blob = this._base64toBlob(dirMap, 'image/png');
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

  deleteDirMap(key) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_DIRMAP,
      key: key
    });
  }
};
