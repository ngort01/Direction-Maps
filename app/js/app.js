import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import { Router, Route, Link, History, IndexRoute } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'ratchet';
import 'ratchet.css';
import '../sass/style.scss';

// pages
import Home from './pages/Home';
import About from './pages/About';
import MyMaps from './pages/MyMaps';
// components
import TitleBar from './components/TitleBar';
import DirMap from './components/DirMap';
import LoadingScreen from './components/LoadingScreen';
// actions
import UIActions from './actions/UIActions';
// stores
import GeoCodeStore from './stores/GeoCodeStore';
import UIStore from './stores/UIStore';
import DestinationStore from './stores/DestinationStore';
import DirMapStore from './stores/DirMapStore';

// hash location is needed on mobile device
//const history = window.cordova ? createHashHistory() : createBrowserHistory();
const history = createHashHistory();

const App = React.createClass({

  getInitialState() {
    return {
      geoCodeResults: GeoCodeStore.getGeocodeResult(),
      destination: DestinationStore.getDestination(),
      showDirMap: UIStore.getDirMapStatus(),
      currentDirMap: DirMapStore.getCurrentDirMap(),
      search: UIStore.getSearchStatus()
    };
  },

  componentDidMount() {
    document.addEventListener('backbutton', this._backButton, false);
    GeoCodeStore.addChangeListener(this._onChange);
    DestinationStore.addChangeListener(this._destinationChange);
    UIStore.addChangeListener(this._onChange);
    DirMapStore.addChangeListener(this._dirMapChange);
  },

  componentWillUnmount() {
    document.removeEventListener('backbutton', this._backButton, false);
    GeoCodeStore.removeChangeListener(this._onChange);
    DestinationStore.removeChangeListener(this._destinationChange);
    UIStore.removeChangeListener(this._onChange);
    DirMapStore.removeChangeListener(this._dirMapChange);
  },

  _backButton() {
    let exitApp = (navigator.app && navigator.app.exitApp) || (navigator.device && navigator.device.exitApp);
    if (this.state.showDirMap) {
      UIActions.toggleDirMap();
    } else if (this.state.search) {
      UIActions.toggleSearch();
    } else {
      exitApp();
    }
  },

  _onChange() {
    this.setState({
      geoCodeResults: GeoCodeStore.getGeocodeResult(),
      showDirMap: UIStore.getDirMapStatus(),
      search: UIStore.getSearchStatus()
    });
  },

  _destinationChange() {
    this.setState({
      destination: DestinationStore.getDestination()
    });
  },

  _dirMapChange() {
    this.setState({
      currentDirMap: DirMapStore.getCurrentDirMap()
    });
  },

  render() {
    let {geoCodeResults, destination, showDirMap, currentDirMap} = this.state;

    return (
      <div className='app'>
        <LoadingScreen />
        <TitleBar geoCodeResults={geoCodeResults} destination={destination}/>
        <div className='content'>
          {this.props.children && React.cloneElement(this.props.children, {
            destination: destination
          })}
        </div>
        <ReactCSSTransitionGroup
          component='div' transitionName='subpage'
          transitionEnterTimeout={300} transitionLeaveTimeout={300}
        >
          {showDirMap ? <DirMap key='dirmap' dirmap={currentDirMap}/> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='about' component={About} />
      <Route path='my-maps' component={MyMaps} />
    </Route>
  </Router>
), document.getElementById('root'));
