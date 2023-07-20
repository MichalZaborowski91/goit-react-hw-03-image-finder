import React, { Component } from 'react';
import css from './modal.module.css';

class Modal extends Component {
  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClose}>
        <div className={css.modal}>
          <img
            className={css.image}
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
