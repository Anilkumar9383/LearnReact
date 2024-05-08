import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './navbar';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Navbar/>
        <Container>
            <div>
                {this.props.children}
            </div>
        </Container>
      </div>
    )
  }
}
