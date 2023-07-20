import React, { Component } from 'react';
import css from './searchBar.module.css';

class SearchBar extends Component {
  render() {
    const { inputSearch, handleChange, handleSubmit } = this.props;
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button className={css.searchBtn} type="submit">
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            className={css.input}
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
