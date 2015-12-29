import keyMirror from 'keymirror';

module.exports = {
  ActionTypes: keyMirror({
    TOGGLE_SEARCH: null,
    SHOW_SEARCH: null,

    GEOCODE: null,
    SET_DESTINATION: null,

    GET_DIR_MAP: null,
    TOGGLE_DIR_MAP: null,

    REQUESTING: null,
    REQUEST_FAIL: null,
    REQUEST_SUCCESS: null

  })
};
