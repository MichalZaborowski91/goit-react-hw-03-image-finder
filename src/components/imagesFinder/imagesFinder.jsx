import React, { Component } from 'react';
import axios from 'axios';
import css from './imagesFinder.module.css';
import SearchBar from 'components/searchBar/searchBar';
import Button from '../button/button.jsx';

const API_KEY = '36841303-60370a725d5fd0d1f3e01c212';

class ImagesFinder extends Component {
  state = {
    images: [],
    inputSearch: '',
    perPage: 12,
    currentPage: 1,
    totalHits: null,
  };
  async componentDidMount() {
    this.fetchImages();
  }
  fetchImages = async () => {
    try {
      const { inputSearch, perPage, page } = this.state;
      const response = await axios.get(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      const data = await response.data.hits;
      const dataTotalHits = await response.data.totalHits;

      this.setState(prevState => ({
        ...prevState,
        images: data,
        totalHits: dataTotalHits,
      }));
    } catch (error) {
      console.log('error', error);
    }
  };
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.fetchImages();
  };
  addMoreImages = async () => {
    const { inputSearch, currentPage, perPage } = this.state;
    const nextPage = currentPage + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?q=${inputSearch}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    const newImages = response.data.hits;
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
      currentPage: nextPage,
    }));
  };
  render() {
    return (
      <div>
        <div>
          <SearchBar
            inputSearch={this.inputSearch}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <div>
            <ul>
              {this.state.images.length > 0 ? (
                <div>
                  {this.state.images.map(el => (
                    <li className={css.imageGallery} key={el.id}>
                      <img
                        className={css.imageGalleryItemImage}
                        src={el.webformatURL}
                      />
                    </li>
                  ))}
                </div>
              ) : (
                <div>brak</div>
              )}
            </ul>
            {this.state.images.length === 0 ||
            this.state.images.length >= this.state.totalHits ? (
              <Button addMoreImages={this.addMoreImages} />
            ) : (
              <Button addMoreImages={this.addMoreImages} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImagesFinder;
