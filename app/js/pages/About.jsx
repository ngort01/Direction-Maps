import React from 'react';

const About = React.createClass({
  render() {
    let ifgi_logo = require('../../assets/ifgi_logo.jpg');

    return (
      <div className='about content-padded'>
        <p>
            DirMaps is a prototype application developed during the
            'Direction Maps' course at the Institute for Geoinformatics
            of the University of Muenster.
						<br/>
            It allows you to automatically creaty destination maps.
            <br/>
            <br/>
            Institute for Geoinformatics<br/>
            Heisenbergstraße 2<br/>
            48149 Muenster
        </p>
        <img className='ifgi_logo' src={ifgi_logo} />
      </div>
    );
  }
});

module.exports = About;
