import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './navbar';
import Marquee from "react-fast-marquee";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Navbar />
        <Container fluid id='maincontainar'>
          <div className='' style={{ backgroundColor: '#dbffff' }}><Marquee className='text-danger'>
            Welcome to our project. Last Login time: - <label className='d-flex'>{window.sessionStorage.getItem('LastLogin')}</label>
          </Marquee></div>
          <div id='maincntdiv'>
            {this.props.children}
          </div>
        </Container>
      </div>
    )
  }
}
