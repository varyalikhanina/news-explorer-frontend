/* eslint-disable class-methods-use-this */

import { filterDate } from '../utils/utils';

export default class NewsCard {
  constructor(image, date, link, heading, text, source, keyword, id) {
    this.image = image;
    this.date = date;
    this.link = link;
    this.heading = heading;
    this.text = text;
    this.source = source;
    this.keyword = keyword;
    this._id = id;
    if (document.URL.includes('articles.html')) {
      document.querySelector('.results__cards').addEventListener('click', this._saveArticle);
      document.querySelector('.results__cards').addEventListener('click', this._deleteArticle);
    }
  }

  create() {
    const template = document.getElementById('results__card-template');
    const card = template.content.cloneNode(true).querySelector('.results__card');
    const cardImage = card.querySelector('.results__card-image');
    cardImage.setAttribute('src', `${this.image}`);
    const cardDate = card.querySelector('.results__card-date');
    if (document.URL.includes('index.html')) {
      cardDate.textContent = this._filterDate();
    } else {
      cardDate.textContent = this.date;
    }
    const cardLink = card.querySelector('.results__card-link');
    cardLink.setAttribute('href', `${this.link}`);
    const cardHeading = card.querySelector('.results__card-heading');
    cardHeading.textContent = this.heading;
    const cardText = card.querySelector('.results__card-text');
    cardText.textContent = this.text;
    const cardSource = card.querySelector('.results__card-source');
    cardSource.textContent = this.source;
    card.setAttribute('articleID', this._id);
    this._renderIcon(card);
    return card;
  }

  _filterDate() {
    return filterDate(this.date);
  }

  _renderIcon(card) {
    if (localStorage.getItem('token') === null) {
      const iconLoggedIn = `<button class="results__card-icon">
      <svg class="results__card-icon-image results__card-icon-image_save results__card-icon-image_disabled" width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z"/>
      </svg>
      </button>
      <button class="results__card-icon-button results__card-icon-button_message">Войдите, чтобы сохранять статьи</button>`;
      card.insertAdjacentHTML('beforeend', iconLoggedIn);
    } else if (localStorage.getItem('token') !== null && document.URL.includes('index.html')) {
      const iconNotLoggedInIndex = `<button class="results__card-icon results__card-icon_logged-in not-saved">
      <svg class="results__card-icon-image results__card-icon-image_save results__card-icon-image_disabled" width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z"/>
      </svg>
      </button>
      <button class="results__card-icon-button results__card-icon-button_keyword" style="display: none">${this.keyword}</button>`;
      card.insertAdjacentHTML('beforeend', iconNotLoggedInIndex);
    } else if (localStorage.getItem('token') !== null && document.URL.includes('articles.html')) {
      const iconNotLoggedInArticles = `<button class="results__card-icon results__card-icon_delete">
      <svg class="results__card-icon-image results__card-icon-image_delete results__card-icon-image_disabled" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z"/>
      </svg>
      </button>
      <button class="results__card-icon-button results__card-icon-button_message">Убрать из сохраненных</button>
      <button class="results__card-icon-button results__card-icon-button_keyword">${this.keyword}</button>`;
      card.insertAdjacentHTML('beforeend', iconNotLoggedInArticles);
    }
  }

  _saveArticle(event) {
    if (event.target.closest('.results__card-icon_logged-in')) {
      const card = event.target.closest('.results__card');
      const saveButton = card.querySelector('.results__card-icon-image');
      saveButton.classList.toggle('results__card-icon-image_blue');
      saveButton.classList.toggle('results__card-icon-image_disabled');
    }
  }

  _deleteArticle(event) {
    if (event.target.closest('.results__card-icon_delete')) {
      const card = event.target.closest('.results__card');
      card.remove();
    }
  }
}
