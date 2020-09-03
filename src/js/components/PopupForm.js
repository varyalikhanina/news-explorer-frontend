export default class PopupForm {
  constructor(anyForm) {
    this.anyForm = anyForm;
    this.validateForm();
  }

  checkInputValidity(input, error) {
    this.input = input;
    this.error = error;
    this.checkIfValueIsMissing();
    this.checkInputType();
    this.checkInputLength();
    this.validateInputElement();
    return this.isInputValid;
  }

  checkIfValueIsMissing() {
    const noContent = 'Это обязательное поле';
    if (this.input.validity.valueMissing) {
      this.error.textContent = noContent;
      this.error.style.display = 'block';
      this.isInputValid = false;
    }
  }

  checkInputType() {
    const linkContent = 'Здесь должен быть e-mail';
    if (this.input.validity.typeMismatch) {
      this.error.textContent = linkContent;
      this.error.style.display = 'block';
      this.isInputValid = false;
    }
  }

  checkInputLength() {
    const wrongInput = 'Должно быть от 2 до 30 символов';
    if (this.input.validity.tooLong || this.input.validity.tooShort) {
      this.error.textContent = wrongInput;
      this.error.style.display = 'block';
      this.isInputValid = false;
    }
  }

  validateInputElement() {
    if (this.input.checkValidity()) {
      this.error.style.display = 'none';
      this.isInputValid = true;
    }
  }

  setSubmitButtonState(button, status) {
    this.button = button;
    this.status = status;
    if (this.status) {
      this.button.classList.add('popup__button_active');
      this.button.classList.remove('popup__button_disabled');
      this.button.disabled = false;
    } else {
      this.button.classList.remove('popup__button_active');
      this.button.classList.add('popup__button_disabled');
      this.button.disabled = true;
    }
  }

  validateForm() {
    this.anyForm.addEventListener('input', () => {
      let isFormValid = true;
      const elements = Array.from(this.anyForm.elements);
      const elementsFiltered = elements.filter((elem) => elem.type !== 'submit');
      elementsFiltered.forEach((elem) => {
        const errors = elem.nextElementSibling;
        const isValidInput = this.checkInputValidity(elem, errors);
        if (!isValidInput) {
          isFormValid = false;
        }
        const button = this.anyForm.querySelector('.button');
        this.setSubmitButtonState(button, isFormValid);
      });
    });
    this.anyForm.querySelector('.popup__button').addEventListener('click', () => {
      let isFormValid = true;
      const elements = Array.from(this.anyForm.elements);
      const elementsFiltered = elements.filter((elem) => elem.type !== 'submit');
      elementsFiltered.forEach((elem) => {
        const errors = elem.nextElementSibling;
        const isValidInput = this.checkInputValidity(elem, errors);
        if (!isValidInput) {
          isFormValid = false;
        }
        const button = this.anyForm.querySelector('.popup__button');
        this.setSubmitButtonState(button, isFormValid);
      });
    });
  }
}
