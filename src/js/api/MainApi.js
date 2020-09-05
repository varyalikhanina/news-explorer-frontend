/* eslint-disable no-restricted-globals */

import { showUserExistsMessage, hideUserExistsMessage } from '../utils/utils';

export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  signup(email, password, name) {
    return fetch(`${this.url}/signup`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      })
      .then((res) => {
        if (res.ok) {
          hideUserExistsMessage();
          return res.json();
        } if (res.status === 409) {
          showUserExistsMessage();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } if (res.status === 401) {
          location.URL = 'index.html';
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  createArticle(article) {
    const {
      title, text, date, source, keyword, link, image, articleID,
    } = article;
    return fetch(`${this.url}/articles`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        text,
        date,
        source,
        keyword,
        link,
        image,
        articleID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  removeArticle(articleID) {
    return fetch(`${this.url}/articles/${articleID}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
