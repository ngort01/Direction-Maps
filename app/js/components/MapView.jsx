import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import L from 'leaflet';
import 'leaflet.css';

const MapView = React.createClass({

  mixins: [PureRenderMixin],

  componentDidMount() {
    this.map = L.map(this.refs.map).setView([51.964711, 7.628496], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
			{attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
		).addTo(this.map);
  },

  render() {
    return (
			<div className='map' ref='map'/>
    );
  }
});

module.exports = MapView;
