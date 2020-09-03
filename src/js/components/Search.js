/* eslint-disable class-methods-use-this */

export default class Search {
  checkInputValidity(input, error) {
    this.input = input;
    this.error = error;
    const noContent = 'Нужно ввести ключевое слово';
    if (this.input.validity.valueMissing || this.input.validity.patternMismatch) {
      this.error.textContent = noContent;
      this.error.style.display = 'block';
    } else {
      this.error.style.display = 'none';
    }
  }

  containerHide() {
    document.querySelector('.results').style.display = 'none';
  }

  preloaderShow() {
    document.querySelector('.preloader').style.display = 'flex';
  }

  preloaderHide() {
    document.querySelector('.preloader').style.display = 'none';
  }

  notFoundShow() {
    document.querySelector('.not-found').style.display = 'flex';
  }

  notFoundHide() {
    document.querySelector('.not-found').style.display = 'none';
  }

  errorShow() {
    document.querySelector('.error').style.display = 'flex';
  }

  errorHide() {
    document.querySelector('.error').style.display = 'none';
  }

  showMoreButtonShow() {
    document.querySelector('.results__show-more').style.display = 'flex';
  }

  showMoreButtonHide() {
    document.querySelector('.results__show-more').style.display = 'none';
  }

  blockSearchButton() {
    const searchButton = document.querySelector('.search__form-button');
    searchButton.style.backgroundColor = '#E6E8EB';
    searchButton.style.color = '#B6BCBF';
  }

  unblockSearchButton() {
    const searchButton = document.querySelector('.search__form-button');
    searchButton.style.backgroundColor = '#2F71E5';
    searchButton.style.color = '#fff';
  }

  clearResults(container) {
    this.container = container;
    const arrayCards = document.querySelectorAll('.results__card');
    arrayCards.forEach((item) => {
      this.container.removeChild(item);
    });
  }
}
