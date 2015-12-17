import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
//stores
import UIStore from '../stores/UIStore';
//components
import TitleBarStandard from './TitleBarStandard';
import TitleBarSearch from './TitleBarSearch';

// fixed bar at the top of the site
const TitleBar = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      search: UIStore.getSearchStatus()
    };
  },

  componentDidMount() {
    UIStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UIStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      search: UIStore.getSearchStatus()
    });
  },

  render() {
    let {search} = this.state;
    let {geoCodeResults, destination} = this.props;
    let comp = search ?
                <TitleBarSearch geoCodeResults={geoCodeResults} destination={destination}/>
                :
                <TitleBarStandard/>;

    return (
      <header className='bar bar-nav'>
        {comp}
      </header>
    );
  }
});

module.exports = TitleBar;
