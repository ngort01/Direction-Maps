import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import { Router, Route, Link, History, IndexRoute } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import 'ratchet';
import 'ratchet.css';
import '../sass/style.scss';

// pages
import Home from './pages/Home';
import About from './pages/About';
import MyMaps from './pages/MyMaps';
// components
import TitleBar from './components/TitleBar';

// hash location is needed on mobile device
//const history = window.cordova ? createHashHistory() : createBrowserHistory();
const history = createHashHistory();

const App = React.createClass({

  render() {

    return (
      <div className='app'>
        <TitleBar/>
        <div className='content'>
          {this.props.children}
        </div>
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
