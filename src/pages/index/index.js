/* eslint-disable no-useless-return */
/* eslint-disable no-alert */

import './index.css';

import {
  MAIN_API_URL, BASE_URL,
} from '../../js/constants/constants';

import MainApi from '../../js/api/MainApi';
import Popup from '../../js/components/Popup';
import PopupSuccess from '../../js/components/PopupSuccess';
import PopupForm from '../../js/components/PopupForm';
import NewsApi from '../../js/api/NewsApi';
import NewsCardList from '../../js/components/NewsCardList';
import Search from '../../js/components/Search';
import Header from '../../js/components/Header';
import MobileMenu from '../../js/components/MobileMenu';

const nav = document.querySelector('.nav');
const mobileMenu = document.querySelector('.nav_mobile');
const searchForm = document.querySelector('.search__form');
const searchInput = searchForm.querySelector('.search__form-input');
const searchError = searchForm.querySelector('.search__form-error');
const login = document.querySelector('.nav__authorize');
const signupLink = document.querySelector('.popup__redirect-link_signup');
const loginLink = document.querySelector('.popup__redirect-link_login');
const popupLogin = document.querySelector('.popup_login');
const popupSignup = document.querySelector('.popup_signup');
const signupForm = document.forms.signup;
const loginForm = document.forms.login;
const popupSuccess = document.querySelector('.popup_success');
const successLoginLink = popupSuccess.querySelector('.popup__redirect-link_login');
const burger = document.querySelector('.nav__burger');
const mobileMenuClose = document.querySelector('.nav__close');
const loginMobile = document.querySelector('.nav__authorize_mobile');
const results = document.querySelector('.results__cards');
const logoutButton = document.querySelector('.nav__authorize_logout');
const logoutMobile = document.querySelector('.nav__authorize_logout-mobile');
const username = document.querySelector('.nav__authorize-name');
const mobileUserName = document.querySelector('.nav__authorize-name_mobile');

// поиск
const newNewsApi = new NewsApi(BASE_URL);
const newSearch = new Search();

const searchNews = (event) => {
  event.preventDefault();
  newSearch.errorHide();
  newSearch.clearResults(results);
  newSearch.preloaderShow();
  newSearch.blockSearchButton();
  newSearch.containerHide();
  newSearch.notFoundHide();
  const searchFormInputValue = searchInput.value;
  newNewsApi
    .getNews(searchFormInputValue)
    .then((res) => {
      newSearch.preloaderHide();
      newSearch.notFoundHide();
      newSearch.unblockSearchButton();
      document.addEventListener('click', () => {
        if (results.childElementCount === res.articles.length) {
          newSearch.showMoreButtonHide();
        }
      });
      searchForm.addEventListener('submit', () => {
        newSearch.showMoreButtonShow();
      });
      if (res.articles.length > 0) {
        const newNewsCardList = () => {
          new NewsCardList(results, res, searchFormInputValue).addToResults();
        };
        newNewsCardList();
      } else if (res.articles.length === 0) {
        newSearch.containerHide();
        newSearch.preloaderHide();
        newSearch.notFoundShow();
      }
    })
    .catch((err) => {
      newSearch.errorShow();
      console.log(err.message);
    })
    .finally(() => {
      newSearch.preloaderHide();
    });
};

const searchInputValidate = () => {
  newSearch.checkInputValidity(searchInput, searchError);
};

searchForm.addEventListener('submit', searchNews);
searchForm.addEventListener('input', searchInputValidate);

// управление попапами
const newPopupLogin = () => {
  new Popup(login, popupLogin);
};
newPopupLogin();

const newPopupLoginClose = () => {
  new Popup(login, popupLogin).close();
};

const newPopupLoginFromSignup = () => {
  new Popup(loginLink, popupLogin);
};
newPopupLoginFromSignup();

const newPopupLoginMobile = () => {
  new Popup(loginMobile, popupLogin);
};
newPopupLoginMobile();

const newPopupLoginFromSuccess = () => {
  new Popup(successLoginLink, popupLogin);
};
newPopupLoginFromSuccess();

const newPopupSignup = () => {
  new Popup(signupLink, popupSignup);
};
newPopupSignup();

// управление формами
const newLoginForm = () => {
  new PopupForm(loginForm);
};
newLoginForm();
const newSignupForm = () => {
  new PopupForm(signupForm);
};
newSignupForm();

// запросы к MainApi
const newMainApi = new MainApi(MAIN_API_URL);
const newHeader = new Header();

const setUserName = () => {
  newMainApi.getUserData()
    .then((result) => {
      username.textContent = result.data.name;
      mobileUserName.textContent = result.data.name;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const userSignup = () => {
  const emailSignup = signupForm.elements.email;
  const passwordSignup = signupForm.elements.password;
  const nameSignup = signupForm.elements.name;
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newMainApi.signup(emailSignup.value, passwordSignup.value, nameSignup.value)
      .then(() => {
        new Popup(signupLink, popupSignup).close();
        new PopupSuccess(popupSuccess);
        signupForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
userSignup();

const userLogin = () => {
  const emailLogin = loginForm.elements.email;
  const passwordLogin = loginForm.elements.password;
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newMainApi.signin(emailLogin.value, passwordLogin.value)
      .then((res) => {
        localStorage.setItem('token', res.token);
        if (window.innerWidth >= 769) {
          newHeader.buttonsBeforeLoginHide();
          newHeader.buttonsAfterLoginShow();
        } if (window.innerWidth < 769) {
          newHeader.mobileButtonsBeforeLoginHide();
          newHeader.mobileButtonsAfterLoginShow();
        }
        setUserName();
        newPopupLoginClose();
        loginForm.reset();
      })
      .catch(() => {
        alert('Неверная почта или пароль');
      });
  });
};
userLogin();

newHeader.logout(logoutButton);
newHeader.mobileLogout(logoutMobile);
window.addEventListener('load', () => {
  setUserName();
  newHeader.stayLoggedIn();
});
window.addEventListener('resize', () => {
  if (window.innerWidth < 769) {
    newHeader.buttonsAfterLoginHide();
    newHeader.buttonsBeforeLoginHide();
  } else if (window.innerWidth >= 769 && localStorage.getItem('token') !== null) {
    mobileMenu.classList.remove('nav_is-opened');
    nav.style.display = 'flex';
    newHeader.buttonsAfterLoginShow();
    newHeader.buttonsBeforeLoginHide();
    newHeader.mobileButtonsAfterLoginShow();
    newHeader.mobileButtonsBeforeLoginHide();
  } else if (window.innerWidth >= 769 && localStorage.getItem('token') == null) {
    mobileMenu.classList.remove('nav_is-opened');
    nav.style.display = 'flex';
    newHeader.buttonsBeforeLoginShow();
    newHeader.buttonsAfterLoginHide();
    newHeader.mobileButtonsBeforeLoginShow();
    newHeader.mobileButtonsAfterLoginHide();
  }
});

const saveArticle = (event) => {
  if (event.target.closest('.not-saved')) {
    const icon = event.target.closest('.results__card-icon');
    const card = event.target.closest('.results__card');
    const saveButton = card.querySelector('.results__card-icon-image');
    saveButton.classList.add('results__card-icon-image_blue');
    saveButton.classList.remove('results__card-icon-image_disabled');
    const article = [];
    article.image = card.querySelector('.results__card-image').src;
    article.date = card.querySelector('.results__card-date').textContent;
    article.link = card.querySelector('.results__card-link').href;
    article.title = card.querySelector('.results__card-heading').textContent;
    article.text = card.querySelector('.results__card-text').textContent;
    article.source = card.querySelector('.results__card-source').textContent;
    article.keyword = card.querySelector('.results__card-icon-button_keyword').textContent;
    newMainApi.createArticle(article)
      .then((res) => {
        card.setAttribute('articleID', res.data._id);
        article.articleID = res.data._id;
        icon.classList.remove('not-saved');
        icon.classList.add('saved');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  }
};
results.addEventListener('click', saveArticle);

const deleteArticle = (event) => {
  if (event.target.closest('.saved')) {
    const icon = event.target.closest('.saved');
    const card = event.target.closest('.results__card');
    const saveButton = card.querySelector('.results__card-icon-image');
    saveButton.classList.remove('results__card-icon-image_blue');
    saveButton.classList.add('results__card-icon-image_disabled');
    const cardId = card.getAttribute('articleID');
    newMainApi.removeArticle(cardId)
      .then(() => {
        icon.classList.add('not-saved');
        icon.classList.remove('saved');
        card.removeAttribute('articleID');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`);
      });
  }
};
results.addEventListener('click', deleteArticle);

// мобильное меню
const newMobileMenuUnathorized = () => {
  new MobileMenu(burger, nav, mobileMenu, mobileMenuClose);
};
newMobileMenuUnathorized();
