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

function createBodyMarkupForm(typeFormTemplate, items) {
  const imageMarkupCreate = document.querySelector('.container-result');
  imageMarkupCreate.innerHTML = typeFormTemplate(items);
}

export { createSearchForm, createBodyMarkupForm };
