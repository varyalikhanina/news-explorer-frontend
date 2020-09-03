/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

export const dateTo = () => {
  const date = new Date();
  const dateToConst = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return dateToConst;
};

export const dateFrom = () => {
  const weekInMilliseconds = 604800000;
  const date = new Date();
  const weekAgo = new Date(date - weekInMilliseconds);
  const dateFromConst = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`;
  return dateFromConst;
};

export const filterDate = (anyDate) => {
  const rawDate = new Date(anyDate);
  const year = rawDate.getFullYear();
  let month = rawDate.getMonth() + 1;
  const day = rawDate.getDate();
  switch (month) {
    case 1:
      month = 'января';
      break;
    case 2:
      month = 'февраля';
      break;
    case 3:
      month = 'марта';
      break;
    case 4:
      month = 'апреля';
      break;
    case 5:
      month = 'мая';
      break;
    case 6:
      month = 'июня';
      break;
    case 7:
      month = 'июля';
      break;
    case 8:
      month = 'августа';
      break;
    case 9:
      month = 'сентября';
      break;
    case 10:
      month = 'октября';
      break;
    case 11:
      month = 'ноября';
      break;
    case 12:
      month = 'декабря';
      break;

    default:
      month = 'месяца';
      break;
  }
  // eslint-disable-next-line no-useless-concat
  const date = `${day.toString()} ${month.toString()} ${year.toString()}` + ' года';
  return date;
};

const onlyUnique = (arr) => {
  const result = [];
  for (const item of arr) {
    if (result.includes(item) === false) {
      result.push(item);
    }
  }
  return result;
};

export const renderKeywords = (array, firstKeyword, secondKeyword, keywordsNumber) => {
  const cards = Array.from(array);
  const keywords = [];
  cards.forEach((card) => keywords.push(card.keyword));
  const uniqueKeywords = onlyUnique(keywords);
  firstKeyword.textContent = `${uniqueKeywords[0]}`;
  secondKeyword.textContent = `, ${uniqueKeywords[1]}`;
  if (uniqueKeywords.length === 1) {
    secondKeyword.textContent = '';
  } if (uniqueKeywords.length > 2) {
    keywordsNumber.textContent = ` и ${uniqueKeywords.length - 2} других`;
  } else {
    keywordsNumber.textContent = '';
  }
};

export const showUserExistsMessage = () => {
  const error = document.querySelector('.error-message_user-exists');
  error.textContent = 'Такой пользователь уже есть';
  error.style.display = 'block';
  error.style.textAlign = 'center';
};

export const hideUserExistsMessage = () => {
  const error = document.querySelector('.error-message_user-exists');
  error.style.display = 'none';
};
