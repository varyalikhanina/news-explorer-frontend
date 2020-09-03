/* eslint-disable class-methods-use-this */
import NewsCard from './NewsCard';
import {
  NEWS_PER_PAGE,
} from '../constants/constants';

export default class SavedNewsCardList {
  constructor(container, news) {
    this.container = container;
    this.news = news;
    this.start = 0;
    this.end = NEWS_PER_PAGE;
    this.showMoreNews('addEventListener');
  }

  createNewsArray() {
    const newsMap = this.news.map((card) => {
      const newsCard = new NewsCard(
        card.image,
        card.date,
        card.link,
        card.title,
        card.text,
        card.source,
        card.keyword,
        card._id,
      );
      return newsCard.create();
    });
    return newsMap;
  }

  addToResults() {
    this.container.parentElement.style.display = 'block';
    this.container.style.display = 'grid';
    this.createNewsArray().splice(this.start, this.end).forEach((element) => {
      this.container.appendChild(element);
    });
    this.showMoreNews('removeEventListener');
  }

  showMoreNews(action) {
    document.querySelector('.results__show-more')[action]('click', () => {
      this.start += 3;
      this.addToResults();
    });
  }

  showZero() {
    document.querySelector('.info__greeting').textContent = 'У вас нет сохранённых статей';
    document.querySelector('.info__keywords').textContent = '';
  }
}
