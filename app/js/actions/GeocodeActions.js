import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants, {ActionTypes} from '../constants/Constants';
import GeoCodeApi from '../utils/GeoCodeApi';

module.exports = {

  geocode(queryTerm) {
    let url = encodeURI('http://photon.komoot.de/api/?q=' + queryTerm + '&lat=51.961831&lon=7.617630&limit=5&lang=de');
    GeoCodeApi.geocode(url);
  },

  clear() {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_GEOCODE_RESULT
    });
  },

  reverseGeocode(lat, lng) {
    let url = encodeURI('http://photon.komoot.de/reverse?lon=' + lng + '&lat=' + lat);
    GeoCodeApi.reverseGeocode(url);
  },

};
