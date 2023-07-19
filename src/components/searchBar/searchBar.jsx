import React, { Component } from 'react';
import css from '../imagesFinder/imagesFinder.module.css';

class SearchBar extends Component {
  render() {
    const { inputSearch, handleChange, handleSubmit } = this.props;
    return (
      <header className={css.searchBar}>
        <form onSubmit={handleSubmit}>
          <button className={css.searchFormButton} type="submit">
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputSearch"
            value={inputSearch}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
