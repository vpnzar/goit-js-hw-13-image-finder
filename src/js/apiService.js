import axios from 'axios';
import getRefs from './refs';
import searchFormTemplate from '../templates/search-form.hbs';
import photoCardTemplate from '../templates/photo-card.hbs';
import galleryFormTemplate from '../templates/gallery-form.hbs';
import debounce from '../..//node_modules/lodash.debounce/index';
import { createSearchForm, createBodyMarkupForm, createLoadBtn } from './templateHandler';
import { alert, defaultModules } from '../../node_modules/@pnotify/core';
const API_URL = 'https://pixabay.com/api';
const API_KEY = '23038221-87f79236823d8e345a162521c';
const refs = getRefs();
let pageNumber = 1;
const queryImgResultsALL = [];

document.addEventListener('DOMContentLoaded', bodyMarkup);

function bodyMarkup() {
  createSearchForm();
  const inputFormLink = document.querySelector('#search-form');

  inputFormLink.addEventListener('input', debounce(inputHandler, 500));
}

function searchPhotoCollection(query, pageNumber) {
  axios
    .get(
      `${API_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${API_KEY}`,
    )
    .then(data => {
      if (pageNumber === 1) {
        handleResult(data.data.hits);
        queryImgResultsALL.splice(...data.data.hits);
      } else queryImgResultsALL.splice(...data.data.hits);
    })
    .catch();
}

function inputHandler(e) {
  e.preventDefault();
  searchPhotoCollection(e.data, pageNumber);

  if (e.data !== '') {
    createLoadBtn();
    eventLoadMoreBtn();
  }
  //  else if (e.data !== '') {
  //   const imageMarkupCreate = document.querySelector('.container-result');
  //   imageMarkupCreate.innerHTML = '';
  //   searchPhotoCollection(e.data, currentPage++);
  // }

  console.log(queryImgResultsALL);
}

function handleResult(arr) {
  createBodyMarkupForm('afterbegin', arr);
  // galleryFormLink.innerHTML = '';
}

function eventLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load');
  loadMoreBtn.addEventListener('click', loadMoreImg);
}

function loadMoreImg(e) {
  e.preventDefault();
  const loadMoreBtn = document.querySelector('.load');

  searchPhotoCollection(pageNumber++);
  createBodyMarkupForm('beforeend', queryImgResultsALL);
  // const galleryListResults = document.querySelector('.gallery');
  // const loadMoreResult = document.createElement('div');
  // loadMoreBtn.append(galleryListResults);
  // loadMoreResult.classList.add('load-more');
  // const containerLoadMore = document.querySelector('.load-more');
  //   if (e) {

  //   }
  console.log(queryImgResultsALL);
}

// // defaultModules.set(PNotifyMobile, {});

// alert({
//   text: 'Notice me, senpai!',
// });
