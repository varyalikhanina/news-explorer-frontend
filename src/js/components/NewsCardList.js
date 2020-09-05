/* eslint-disable no-param-reassign */

import NewsCard from './NewsCard';
import {
  NEWS_PER_PAGE,
} from '../constants/constants';

export default class NewsCardlist {
  constructor(container, news, key) {
    this.container = container;
    this.news = news;
    this.start = 0;
    this.key = key;
    this.showMoreNews('addEventListener');
  }

  createNewsArray() {
    const newsMap = this.news.articles.map((card) => {
      const newsCard = new NewsCard(
        card.urlToImage,
        card.publishedAt,
        card.url,
        card.title,
        card.description,
        card.source.name,
        this.key,
        card.id,
      );
      return newsCard.create();
    });
    return newsMap;
  }

  addToResults() {
    this.container.parentElement.style.display = 'block';
    this.container.style.display = 'grid';
    this.createNewsArray().splice(this.start, NEWS_PER_PAGE).forEach((element) => {
      this.container.appendChild(element);
    });
    this.showMoreNews('removeEventListener');
  }

  clearResults() {
    const arrayCards = document.querySelectorAll('.results__card');
    arrayCards.forEach((item) => {
      this.container.removeChild(item);
    });
  }

  showMoreNews(action) {
    document.querySelector('.results__show-more')[action]('click', () => {
      this.start += 3;
      this.addToResults();
    });
  }
}
