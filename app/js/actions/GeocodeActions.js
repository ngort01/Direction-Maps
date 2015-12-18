import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';


module.exports = {

  geocode(queryTerm) {
    let result;
    let url = encodeURI('http://photon.komoot.de/api/?q=' + queryTerm + '&lat=51.961831&lon=7.617630&limit=5&lang=de');
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

  clear() {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_GEOCODE_RESULT
    });
  },

  reverseGeocode(lat, lng) {
    let result;
    let url = encodeURI('http://photon.komoot.de/reverse?lon=' + lng + '&lat=' + lat);
    let  oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function() {
      if (oReq.readyState == XMLHttpRequest.DONE) {
        if (oReq.status == 200) {
          let dest = {};
          result = JSON.parse(oReq.responseText).features[0];
          dest.lat = result.geometry.coordinates[1];
          dest.lng = result.geometry.coordinates[0];
          dest.name = result.properties.street;
          dest.city = result.properties.city;
          dest.state = result.properties.state;
          console.log(result);
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
  },

};
