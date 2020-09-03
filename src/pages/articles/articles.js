/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-return */

import './articles.css';
import {
  MAIN_API_URL,
} from '../../js/constants/constants';
import { renderKeywords } from '../../js/utils/utils';

import MainApi from '../../js/api/MainApi';
import Header from '../../js/components/Header';
import MobileMenu from '../../js/components/MobileMenu';
import SavedNewsCardList from '../../js/components/SavedNewsCardList';
import Search from '../../js/components/Search';

const nav = document.querySelector('.nav_articles');
const logoutButton = document.querySelector('.nav__authorize_logout');
const logoutMobile = document.querySelector('.nav__authorize_logout-mobile');
const username = document.querySelector('.nav__authorize-name');
const mobileUserName = document.querySelector('.nav__authorize-name_mobile');
const mobileMenuClose = document.querySelector('.nav__close');
const greetingName = document.querySelector('.info__greeting-name');
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav_mobile');
const results = document.querySelector('.results__cards');
const articlesNumber = document.querySelector('.info__greeting-articles-number');
const firstKeyword = document.querySelector('.info__keywords_first');
const secondKeyword = document.querySelector('.info__keywords_second');
const keywordsNumber = document.querySelector('.info__keywords_number');

const newHeader = new Header();

window.addEventListener('resize', () => {
  if (window.innerWidth < 769) {
    newHeader.buttonsAfterLoginHide();
  } else {
    mobileMenu.classList.remove('nav_is-opened');
    nav.style.display = 'flex';
    newHeader.buttonsAfterLoginShow();
  }
});

newHeader.logoutFromArticles(logoutButton);
newHeader.logoutFromArticles(logoutMobile);

const newMainApi = new MainApi(MAIN_API_URL);

const newSearch = new Search();

const setUserName = () => {
  newMainApi.getUserData()
    .then((result) => {
      username.textContent = result.data.name;
      mobileUserName.textContent = result.data.name;
      greetingName.textContent = result.data.name;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getArticles = () => {
  newMainApi.getUserData()
    .then((res) => {
      const id = res.data._id;
      newMainApi.getArticles()
        .then((result) => {
          const newResult = Object.values(result.data).filter((card) => card.owner === id);
          if (newResult.length > 0) {
            renderKeywords(newResult, firstKeyword, secondKeyword, keywordsNumber);
            const newSavedNewsCardList = () => {
              new SavedNewsCardList(results, newResult).addToResults();
            };
            newSavedNewsCardList();
            articlesNumber.textContent = newResult.length;
            document.addEventListener('click', () => {
              if (results.childElementCount === newResult.length) {
                newSearch.showMoreButtonHide();
              }
            });
          } else {
            const newShowZero = () => {
              new SavedNewsCardList(results, newResult).showZero();
            };
            newShowZero();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteArticle = (event) => {
  if (event.target.closest('.results__card-icon-image_delete')) {
    const card = event.target.closest('.results__card');
    const cardId = card.getAttribute('articleID');
    newMainApi.removeArticle(cardId)
      .then(() => {
        card.classList.remove('saved');
        card.removeAttribute('articleID');
        articlesNumber.textContent = parseInt(articlesNumber.textContent) - 1;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  }
};
results.addEventListener('click', deleteArticle);

window.addEventListener('load', () => {
  setUserName();
  getArticles();
});

const newMobileMenuUnathorized = () => {
  new MobileMenu(burger, nav, mobileMenu, mobileMenuClose);
};
newMobileMenuUnathorized();
