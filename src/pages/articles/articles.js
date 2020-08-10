import './articles.css';

const results = document.querySelector('.results__cards');

function deleteCard(event) {
  if (event.target.closest('.results__card-icon')) {
    const article = event.target.closest('.results__card');
    results.removeChild(article);
  }
}

results.addEventListener('click', deleteCard);

const nav = document.querySelector('.nav');
const mobileMenu = document.querySelector('.nav_mobile');
const burger = document.querySelector('.nav__burger');
const mobileMenuClose = document.querySelector('.nav__close');

function showMobileMenu(event) {
  if (event.target.closest('.nav__burger')) {
    nav.style.display = 'none';
    mobileMenu.classList.add('nav_is-opened');
  } else {
    nav.style.display = 'flex';
    mobileMenu.classList.remove('nav_is-opened');
  }
}

burger.addEventListener('click', showMobileMenu);
mobileMenuClose.addEventListener('click', showMobileMenu);
