/* eslint-disable no-param-reassign */
// уберу в будущем
import './index.css';

const nav = document.querySelector('.nav');
const buttonsBeforeLogin = document.querySelector('.nav__buttons_before-login');
const buttonsAfterLogin = document.querySelector('.nav__buttons_after-login');
const mobileMenu = document.querySelector('.nav_mobile');
const navButtons = document.querySelector('.nav__buttons');
const results = document.querySelector('.results__cards');
const login = document.querySelector('.nav__authorize');
const signupLink = document.querySelector('.popup__redirect-link_signup');
const loginLink = document.querySelector('.popup__redirect-link_login');
const popupLogin = document.querySelector('.popup_login');
const popupSignup = document.querySelector('.popup_signup');
const popupLoginCloseButton = document.querySelector('.popup__close_login');
const popupSignupCloseButton = document.querySelector('.popup__close_signup');
const signupForm = document.forms.signup;
const loginForm = document.forms.login;
const popupSuccess = document.querySelector('.popup_success');
const successLoginLink = popupSuccess.querySelector('.popup__redirect-link_login');
const popupSuccessCloseButton = document.querySelector('.popup__close_success');
const burger = document.querySelector('.nav__burger');
const mobileMenuClose = document.querySelector('.nav__close');
const loginMobile = document.querySelector('.nav__authorize_mobile');

function saveArticle(event) {
  if (event.target.closest('.results__card-icon')) {
    const card = event.target.closest('.results__card');
    const saveButton = card.querySelector('.results__card-icon-image');
    saveButton.classList.toggle('results__card-icon-image_blue');
    saveButton.classList.toggle('results__card-icon-image_disabled');
  }
}

// здесь пока не работает закрытие по клику на "оверлей"
function popUpLoginToggle() {
  popupLogin.classList.toggle('popup_is-opened');
  popupSuccess.classList.remove('popup_is-opened');
}

function popUpSignupToggle() {
  popupLogin.classList.toggle('popup_is-opened');
  popupSignup.classList.toggle('popup_is-opened');
}

function popUpSuccessToggle() {
  popupSignup.classList.remove('popup_is-opened');
  popupSuccess.classList.toggle('popup_is-opened');
}

function showMobileMenu(event) {
  if (event.target.closest('.nav__burger')) {
    nav.style.display = 'none';
    mobileMenu.classList.add('nav_is-opened');
  } else {
    nav.style.display = 'flex';
    mobileMenu.classList.remove('nav_is-opened');
  }
}

results.addEventListener('click', saveArticle);
login.addEventListener('click', popUpLoginToggle);
loginMobile.addEventListener('click', popUpLoginToggle);
popupLoginCloseButton.addEventListener('click', popUpLoginToggle);
signupLink.addEventListener('click', popUpSignupToggle);
popupSignupCloseButton.addEventListener('click', popUpSignupToggle);
loginLink.addEventListener('click', popUpSignupToggle);
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  popUpSuccessToggle();
});
popupSuccessCloseButton.addEventListener('click', popUpSuccessToggle);
successLoginLink.addEventListener('click', popUpLoginToggle);
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonsBeforeLogin.style.display = 'none';
  buttonsAfterLogin.style.display = 'flex';
  popUpLoginToggle();
});
window.addEventListener('resize', (event) => {
  if(window.innerWidth <= 768) {
    buttonsBeforeLogin.style.display = 'none';
    buttonsAfterLogin.style.display = 'none';
    burger.style.display = 'block';
  }
});
// доработать скрытие бургера и открытие нужных кнопок меню (для входа или в залогиненном состоянии)
burger.addEventListener('click', showMobileMenu);
mobileMenuClose.addEventListener('click', showMobileMenu);

function checkInputValidity(input, error) {
  let isInputValid = true;
  if (!input.checkValidity()) {
    error.textContent = 'Здесь будет сообщение об ошибке';
    input.style.marginBottom = '0';
    isInputValid = false;
  } else {
    error.textContent = '';
  }
  return isInputValid;
}

function setSubmitButtonState(button, status) {
  if (status) {
    button.classList.add('popup__button_active');
    button.classList.remove('popup__button_disabled');
    button.disabled = false;
  } else {
    button.classList.remove('popup__button_active');
    button.classList.add('popup__button_disabled');
    button.disabled = true;
  }
}

function setEventListeners(anyForm) {
  anyForm.addEventListener('input', () => {
    let isFormValid = true;
    const elements = Array.from(anyForm.elements);
    elements.forEach((elem) => {
      const errors = elem.nextElementSibling;
      const isValidInput = checkInputValidity(elem, errors);
      if (!isValidInput) {
        isFormValid = false;
      }
      const button = anyForm[anyForm.length - 1];
      setSubmitButtonState(button, isFormValid);
    });
  });
}

setEventListeners(signupForm);
setEventListeners(loginForm);
