export default class PopupSuccess {
  constructor(popup) {
    this.popup = popup;
    this.closeButton = popup.querySelector('.popup__close');
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    this.popup.previousElementSibling.classList.remove('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.open();
    this.closeButton.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') && event.target.classList.contains('popup_is-opened')) {
        this.close();
      }
    });
  }
}
