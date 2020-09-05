export default class MobileMenu {
  constructor(openButton, regularMenu, mobileMenu, closeButton) {
    this.openButton = openButton;
    this.regularMenu = regularMenu;
    this.mobileMenu = mobileMenu;
    this.closeButton = closeButton;
    this.mobileMenuOpen();
    this.mobileMenuClose();
  }

  mobileMenuOpen() {
    this.openButton.addEventListener('click', () => {
      this.regularMenu.style.display = 'none';
      this.mobileMenu.classList.add('nav_is-opened');
    });
  }

  mobileMenuClose() {
    this.closeButton.addEventListener('click', () => {
      this.regularMenu.style.display = 'flex';
      this.mobileMenu.classList.remove('nav_is-opened');
    });
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('nav') && event.target.classList.contains('nav_is-opened')) {
        const navMobile = event.target;
        navMobile.classList.remove('nav_is-opened');
        navMobile.previousElementSibling.style.display = 'flex';
      }
    });
  }
}
