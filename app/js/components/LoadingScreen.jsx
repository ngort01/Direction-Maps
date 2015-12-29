import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import assign from 'object-assign';
import Spinner from 'spin';

import DirMapStore from '../stores/DirMapStore';

// style of the loading message
let messageStyle = {
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  color: 'white',
  fontSize: '20px',
  top: '56%',
  padding: '0px 10px',
  fontWeigth: '600'
};

let spinnerStyle = {
  color: '#fff',
  lines: '12',
  length: '0',
  width: '13',
  radius: '20'
};

var LoadingScreen = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      status: 'success'
    };
  },

  componentDidMount() {
    DirMapStore.addChangeListener(this._onChange);
    spinnerStyle = assign(spinnerStyle, this.props.spinner_style);
    new Spinner(spinnerStyle).spin(ReactDOM.findDOMNode(this));
  },

  componentWillUnmount() {
    DirMapStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      status: DirMapStore.getStatus()
    });
  },

  render() {
    let message;
    let {status} = this.state;
    console.log(status);
    let visibility = status === 'requesting' ? 'visible' : 'hidden';
    //messageStyle = assign(messageStyle, message_style);

    switch (status) {
      case 'requesting':
        message = 'Generating map...';
        break;
      case 'request_fail':
        message = 'An error occured!';
        break;
      case 'request_success':
        message = 'Done!';
        break;
    }

    return (
      <div className='overlay loading-screen' style={{visibility: visibility}}>
        <span style={messageStyle}>
          {message}
        </span>
      </div>
    );
  }
});

module.exports = LoadingScreen;
