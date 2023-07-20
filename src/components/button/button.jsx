import React, { Component } from 'react';
import css from './button.module.css';

class Button extends Component {
  render() {
    const { addMoreImages } = this.props;
    return (
      <button className={css.loadMoreBtn} onClick={addMoreImages}>
        Load more
      </button>
    );
  }
}
export default Button;
