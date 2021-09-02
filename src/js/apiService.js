import axios from 'axios';
import getRefs from './refs';
// import searchFormTemplate from '../templates/search-form.hbs';
// import photoCardTemplate from '../templates/photo-card.hbs';
// import galleryFormTemplate from '../templates/gallery-form.hbs';
import debounce from '../..//node_modules/lodash.debounce/index';
import { createSearchForm, createBodyMarkupForm, createLoadBtn } from './templateHandler';
import { alert, defaultModules } from '../../node_modules/@pnotify/core';
import * as basicLightbox from '../../node_modules/basiclightbox';
const API_URL = 'https://pixabay.com/api';
const API_KEY = '23038221-87f79236823d8e345a162521c';
const refs = getRefs();
let pageNumber = 1;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', bodyMarkup);

function bodyMarkup() {
  createSearchForm();
  const inputFormLink = document.querySelector('#search-form');
  createLoadBtn();
  eventLoadMoreBtn();
  inputFormLink.addEventListener('input', debounce(inputHandler, 1000));
}

function searchPhotoCollection(query, pageNumber) {
  axios
    .get(
      `${API_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${API_KEY}`,
    )
    .then(data => {
      if (pageNumber === 1) {
        createBodyMarkupForm('afterbegin', data.data.hits);
      } else if (pageNumber !== 1) {
        createBodyMarkupForm('beforeend', data.data.hits);
      }
    })
    .catch();
}

function inputHandler(e) {
  e.preventDefault();
  searchQuery = e.data;
  const imageMarkupCreate = document.querySelector('.container-result');
  imageMarkupCreate.innerHTML = '';
  searchPhotoCollection(e.data, pageNumber);

  if (searchQuery !== '') {
    setTimeout(function () {
      const loadMoreMarkupBtn = document.querySelector('#button');
      loadMoreMarkupBtn.classList.remove('is-hidden');
      const imageGallery = document.querySelector('.gallery');
      imageGallery.addEventListener('click', openModalWindow);
    }, 1000);
  }
}

function eventLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load');
  loadMoreBtn.addEventListener('click', loadMoreImg);
}

function loadMoreImg(e) {
  e.preventDefault();
  // loadMoreBtn = document.querySelector('.load');

  searchPhotoCollection(searchQuery, ++pageNumber);

  setTimeout(function () {
    const imageMarkupCreate = document.querySelector('.container-result');
    const lastGallery = imageMarkupCreate.lastChild;
    lastGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 500);
}

function openModalWindow(e) {
  e.preventDefault();
  // console.log('object');
  instance.show();
}

const instance = basicLightbox.create(`${console.log('object')}`);

// // defaultModules.set(PNotifyMobile, {});

// alert({
//   text: 'Notice me, senpai!',
// });
