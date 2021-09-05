import axios from '../../node_modules/axios/dist/axios';
import refs from './refs';
import { createSearchForm, createBodyMarkupForm, createLoadBtn } from './templateHandler';
import { alert, defaultModules } from '../../node_modules/@pnotify/core';
import * as basicLightbox from '../../node_modules/basiclightbox/dist/basicLightbox.min';
const API_URL = 'https://pixabay.com/api';
const API_KEY = '23038221-87f79236823d8e345a162521c';
let pageNumber = 1;
let searchQuery = '';
console.log(searchQuery);

document.addEventListener('DOMContentLoaded', bodyMarkup);

function bodyMarkup() {
  createSearchForm();
  const inputFormLink = document.querySelector('#search-form');
  createLoadBtn();
  eventLoadMoreBtn();
  inputFormLink.addEventListener('submit', inputHandler);
}

function searchPhotoCollection(query, pageNumber) {
  axios
    .get(
      `${API_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${API_KEY}`,
    )
    .then(data => {
      createBodyMarkupForm(data.data.hits);
    })
    .catch(error => {
      alert('API request error. See console log');
      if (error) console.error(error);
    });
}

function inputHandler(e) {
  e.preventDefault();
  searchQuery = e.target[0].value;
  const imageMarkupCreate = document.querySelector('.container-result');
  imageMarkupCreate.innerHTML = '';
  searchPhotoCollection(searchQuery);

  if (searchQuery !== '') {
    setTimeout(function () {
      const loadMoreMarkupBtn = document.querySelector('#button');
      loadMoreMarkupBtn.classList.remove('is-hidden');
      openModalEvent(e);
    }, 1000);
  }
}

function openModalEvent() {
  const imageMarkupCreate = document.querySelector('.container-result');
  imageMarkupCreate.addEventListener('click', openModalWindow);
}

function eventLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load');
  loadMoreBtn.addEventListener('click', loadMoreImg);
}

function loadMoreImg(e) {
  e.preventDefault();
  searchPhotoCollection(searchQuery, ++pageNumber);

  setTimeout(function () {
    const imageMarkupCreate = document.querySelector('.container-result');
    const lastGallery = imageMarkupCreate.lastChild;
    lastGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 1000);
}

function openModalWindow(e) {
  const instance = basicLightbox
    .create(
      `
    <img src="${e.target.dataset.source}">
`,
    )
    .show();
}
