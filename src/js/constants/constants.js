export const BASE_URL = 'https://newsapi.org/v2/';
export const API_KEY = 'c873621fc99f409593309d83ab30c229';
export const NEWS_PER_PAGE = 3;
export const TOTAL_NEWS = 100;
export const MAIN_API_URL = 'https://www.api.news-explorer-project.ml';

export const weekInMilliseconds = 604800000;
const date = new Date();
const weekAgo = new Date(date - weekInMilliseconds);
export const DATE_TO = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
export const DATE_FROM = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`;
