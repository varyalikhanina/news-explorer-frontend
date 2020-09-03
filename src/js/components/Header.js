/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */

export default class Header {
  buttonsBeforeLoginHide() {
    document.querySelector('.nav__buttons_before-login').style.display = 'none';
  }

  buttonsBeforeLoginShow() {
    document.querySelector('.nav__buttons_before-login').style.display = 'flex';
  }

  buttonsAfterLoginHide() {
    document.querySelector('.nav__buttons_after-login').style.display = 'none';
  }

  buttonsAfterLoginShow() {
    document.querySelector('.nav__buttons_after-login').style.display = 'flex';
  }

  mobileButtonsBeforeLoginHide() {
    document.querySelector('.nav__mobile-menu_unauthorized').style.display = 'none';
  }

  mobileButtonsBeforeLoginShow() {
    document.querySelector('.nav__mobile-menu_unauthorized').style.display = 'flex';
  }

  mobileButtonsAfterLoginHide() {
    document.querySelector('.nav__mobile-menu_authorized').style.display = 'none';
  }

  mobileButtonsAfterLoginShow() {
    document.querySelector('.nav__mobile-menu_authorized').style.display = 'flex';
  }

  logout(logoutButton) {
    this.logoutButton = logoutButton;
    this.logoutButton.addEventListener('click', () => {
      localStorage.clear();
      this.buttonsAfterLoginHide();
      this.buttonsBeforeLoginShow();
      location.reload();
    });
  }

  mobileLogout(logoutButton) {
    this.logoutButton = logoutButton;
    this.logoutButton.addEventListener('click', () => {
      localStorage.clear();
      this.mobileButtonsAfterLoginHide();
      this.mobileButtonsBeforeLoginShow();
      location.reload();
    });
  }

  logoutFromArticles(logoutButton) {
    this.logoutButton = logoutButton;
    this.logoutButton.addEventListener('click', () => {
      localStorage.clear();
      window.location = 'index.html';
    });
  }

  stayLoggedIn() {
    if (localStorage.getItem('token')) {
      if (window.innerWidth >= 769) {
        this.buttonsAfterLoginShow();
        this.buttonsBeforeLoginHide();
      }
    }
  }
}
