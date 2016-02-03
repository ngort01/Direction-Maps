import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {
  getDirmap(lat, lng, type, name) {
    AppDispatcher.dispatch({
      type: ActionTypes.REQUESTING
    });
    let url = 'http://giv-direction-maps.uni-muenster.de:3000/map?lon='
              + lng + '&lat=' + lat + '&type=' + type + '&name=' + encodeURI(name);
    console.info('REQUESTING: ' + url);
    let  oReq = new XMLHttpRequest();

    function reportStatus(e, name) {
      if (oReq.readyState == XMLHttpRequest.DONE) {
        if (oReq.status == 200) {
          let arr = new Uint8Array(this.response);
          let raw = '';
          let i, j, subArray, chunk = 5000;
          for (i = 0,j = arr.length; i < j; i += chunk) {
            subArray = arr.subarray(i, i + chunk);
            raw += String.fromCharCode.apply(null, subArray);
          }

          let b64 = btoa(raw);
          let dataURL = 'data:image/jpeg;base64,' + b64;

          AppDispatcher.dispatch({
            type: ActionTypes.REQUEST_SUCCESS,
            name: name,
            url: dataURL
          });
          AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_SEARCH
          });
          AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_DIR_MAP
          });

        } else if (oReq.status == 400) {
          console.log('There was an error 400');
          AppDispatcher.dispatch({
            type: ActionTypes.REQUEST_FAIL
          });

        } else {
          console.log('something else other than 200 was returned');
          AppDispatcher.dispatch({
            type: ActionTypes.REQUEST_FAIL
          });
        }
      }
    };
    oReq.onreadystatechange = reportStatus.bind(oReq, null, name);
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';
    oReq.send();

  }
};
