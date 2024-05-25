import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './navbar';
import MarText from './Common/MarqueeText'


export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Navbar />
        <Container fluid id='maincontainar'>
          <MarText/>
          <div id='maincntdiv'>
            {this.props.children}
          </div>
        </Container>
      </div>
    )
  }
}
