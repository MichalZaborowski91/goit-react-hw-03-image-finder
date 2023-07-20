import React, { Component } from 'react';
import axios from 'axios';
import css from './imagesFinder.module.css';
import SearchBar from 'components/searchBar/searchBar';
import Button from '../button/button.jsx';
import Loader from '../loader/loader.jsx';
import Modal from '../modal/modal.jsx';

const API_KEY = '36841303-60370a725d5fd0d1f3e01c212';

class ImagesFinder extends Component {
  state = {
    images: [],
    inputSearch: '',
    perPage: 12,
    currentPage: 1,
    totalHits: null,
    isLoading: false,
    selectedImage: [],
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
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
        isLoading: false,
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
    this.setState({ isLoading: true });
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
  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
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
          {this.state.selectedImage && (
            <Modal image={this.state.selectedImage} onClose={this.closeModal} />
          )}
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <div>
              <ul className={css.gallery}>
                {this.state.images.length > 0 ? (
                  <>
                    {this.state.images.map(el => (
                      <li className={css.item} key={el.id}>
                        <img
                          className={css.image}
                          src={el.webformatURL}
                          alt={el.tags}
                          onClick={() => this.openModal(el)}
                        />
                      </li>
                    ))}
                  </>
                ) : (
                  <h2>No images to display</h2>
                )}
              </ul>
              {this.state.images.length === 0 ||
              this.state.images.length >= this.state.totalHits ? (
                <Button addMoreImages={this.addMoreImages} />
              ) : (
                <Button addMoreImages={this.addMoreImages} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImagesFinder;
