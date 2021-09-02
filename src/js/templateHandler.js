import API from './apiService';
import searchFormTemplate from '../templates/search-form.hbs';
import photoCardTemplate from '../templates/photo-card.hbs';
import galleryFormTemplate from '../templates/gallery-form.hbs';
import refs from './refs';

function createSearchForm() {
  document.body.insertAdjacentHTML('afterbegin', searchFormTemplate());
  const inputFormLink = document.querySelector('#search-form');
  const boxResult = document.createElement('div');
  boxResult.classList.add('container-result');
  inputFormLink.after(boxResult);
}

function createBodyMarkupForm(typePlace, items) {
  const imageMarkupCreate = document.querySelector('.container-result');
  imageMarkupCreate.insertAdjacentHTML(`${typePlace}`, galleryFormTemplate(items));
}

function createLoadBtn() {
  const imageMarkupCreate = document.querySelector('.container-result');
  const loadMoreMarkupBtn = document.createElement('div');
  imageMarkupCreate.after(loadMoreMarkupBtn);
  loadMoreMarkupBtn.classList.add('load');
  loadMoreMarkupBtn.classList.add('is-hidden');
  loadMoreMarkupBtn.setAttribute('id', 'button');
  loadMoreMarkupBtn.textContent = 'Load More...';
}

export { createSearchForm, createBodyMarkupForm, createLoadBtn };
