import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';

module.exports = {
  geocode(url) {
    let result;
    let  oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function() {
      if (oReq.readyState == XMLHttpRequest.DONE) {
        if (oReq.status == 200) {
          result = oReq.responseText;
          AppDispatcher.dispatch({
            type: ActionTypes.GEOCODE,
            result: result
          });
        } else if (oReq.status == 400) {
          console.log('There was an error 400');
        } else {
          console.log('something else other than 200 was returned');
        }
      }
    };

    oReq.open('GET', url, true);
    oReq.send();
  },

  reverseGeocode(url) {
    let result;
    let  oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function() {
      if (oReq.readyState == XMLHttpRequest.DONE) {
        if (oReq.status == 200) {
          let dest = {};
          result = JSON.parse(oReq.responseText).features[0];
          dest.lat = result.geometry.coordinates[1];
          dest.lng = result.geometry.coordinates[0];
          dest.name = result.properties.street + ' ' + result.properties.housenumber;
          dest.city = result.properties.city;
          dest.state = result.properties.state;
          AppDispatcher.dispatch({
            type: ActionTypes.SET_DESTINATION,
            dest: dest
          });
        } else if (oReq.status == 400) {
          console.log('There was an error 400');
        } else {
          console.log('something else other than 200 was returned');
        }
      }
    };

    oReq.open('GET', url, true);
    oReq.send();
  }
};
