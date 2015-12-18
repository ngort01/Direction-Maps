import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import L from 'leaflet';
import 'leaflet.css';
// actions
import GeocodeActions from '../actions/GeocodeActions';
import UIActions from '../actions/UIActions';

const MapView = React.createClass({

  mixins: [PureRenderMixin],

  componentDidMount() {
    L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images';
    this.map = L.map(this.refs.map).setView([51.964711, 7.628496], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
			{attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
		).addTo(this.map);

    this.destMarker = L.marker([51.964711, 7.628496], {draggable: true}).addTo(this.map);
    this.destMarker.on('dragend', this._reverseGeocode);
  },

  componentWillReceiveProps(nextProps) {
    let {destination} = nextProps;
    if (destination.lat && destination.lng) {
      this.map.setView(L.latLng(destination.lat, destination.lng), 16);
      this.destMarker.setLatLng([destination.lat, destination.lng]);
    }
  },

  componentWillUnmount() {
    this.destMarker.off('dragend');
    this.destMarker = null;
    this.map = null;
  },

  _reverseGeocode() {
    UIActions.toggleSearch();
    let LatLng = this.destMarker.getLatLng();
    GeocodeActions.reverseGeocode(LatLng.lat, LatLng.lng);
  },

  render() {
    return (
			<div className='map' ref='map'/>
    );
  }
});

module.exports = MapView;
