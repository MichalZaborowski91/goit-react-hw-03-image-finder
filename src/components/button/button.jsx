import React, { Component } from 'react';
import css from './button.module.css';

class Button extends Component {
  render() {
    const { addMoreImages } = this.props;
    return <button onClick={addMoreImages}>Load more</button>;
  }
}
export default Button;
