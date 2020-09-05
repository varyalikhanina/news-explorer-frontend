import {
  API_KEY, TOTAL_NEWS,
} from '../constants/constants';
import {
  dateTo, dateFrom,
} from '../utils/utils';

export default class NewsApi {
  constructor(url) {
    this.url = url;
  }

  static checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    res.json()
      .then((err) => {
        throw new Error(err.message);
      })
      .catch(console.log('Произошла ошибка'));

    return Promise.reject(new Error(res.status));
  }

  getNews(key) {
    const newUrl = `${this.url}everything?q=${key}&from=${dateFrom}&to=${dateTo}&apiKey=${API_KEY}&pageSize=${TOTAL_NEWS}`;
    return fetch(newUrl)
      .then(NewsApi.checkResponse)
      .catch((err) => {
        console.log(err.message);
      });
  }
}
