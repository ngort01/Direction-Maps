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
      status: 'success',
      visibility: 'hidden',
      message: ''
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
    let status = DirMapStore.getStatus();
    let msgStyle = assign({}, messageStyle);

    if (status === 'requesting') {
      msgStyle.color = 'white';
      messageStyle = assign(messageStyle, msgStyle);
      this.setState({
        status: status,
        visibility: 'visible',
        message: 'Generating map...'
      });

    } else if (status === 'request_fail') {
      msgStyle.color = 'red';
      messageStyle = assign(messageStyle, msgStyle);
      this.setState({
        status: status,
        message: 'An error occured!'
      });

      setTimeout(() => {
        this.setState({
          visibility: 'hidden'
        });
      }, 1000);

    } else {
      msgStyle.color = 'green';
      messageStyle = assign(messageStyle, msgStyle);
      this.setState({
        status: status,
        message: 'Done!'
      });

      setTimeout(() => {
        this.setState({
          visibility: 'hidden'
        });
      }, 500);
    }

  },

  render() {
    let {status, visibility, message} = this.state;
    let msgStyle = assign({}, messageStyle);

    return (
      <div className='overlay loading-screen' style={{visibility: visibility}}>
        <span style={msgStyle}>
          {message}
        </span>
      </div>
    );
  }
});

module.exports = LoadingScreen;
