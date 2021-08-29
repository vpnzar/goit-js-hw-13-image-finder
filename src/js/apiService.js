import axios from 'axios';
import getRefs from './refs';
import searchFormTemplate from '../templates/search-form.hbs';
import photoCardTemplate from '../templates/photo-card.hbs';
import galleryFormTemplate from '../templates/gallery-form.hbs';
import debounce from '../..//node_modules/lodash.debounce/index';
import { createSearchForm, createBodyMarkupForm } from './templateHandler';
const API_URL = 'https://pixabay.com/api';
const API_KEY = '23038221-87f79236823d8e345a162521c';
let API_PAGE = 1;
const refs = getRefs();

document.addEventListener('DOMContentLoaded', bodyMarkup);
// debugger;

function bodyMarkup() {
  createSearchForm();
  const inputFormLink = document.querySelector('#search-form');

  inputFormLink.addEventListener('input', debounce(inputHandler, 500));
}

function inputHandler(e) {
  e.preventDefault();

  searchPhotoCollection(e.data);
  const galleryFormLink = document.querySelector('.gallery');
}

function searchPhotoCollection(query, perPage = 12) {
  axios
    .get(
      `${API_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${API_PAGE}&per_page=${perPage}&key=${API_KEY}`,
    )
    .then(data => {
      handleResult(data.data.hits);
    })
    .catch();
}

function handleResult(result) {
  if (result !== 1) {
    renderCollection(result, galleryFormTemplate);
  }
  // else if (result === 1) {
  //   renderCollection(result, photoCardTemplate);
  // }
}

function renderCollection(arr, renderCard) {
  createBodyMarkupForm(renderCard, arr);
  // galleryFormLink.innerHTML = '';
}

// window.onload = () => {
//   const images = document.querySelectorAll('.gallery__item');
//   const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.5,
//   };

//   function handleImg(myImg, observer) {
//     myImg.forEach(myImgSingle => {
//       console.log('object');
//       // if (myImgSingle.isIntersecting) {
//       //   const lazyImg = myImgSingle.target;

//       //   console.log(lazyImg);
//       // }
//     });
//   }
//   const observer = new IntersectionObserver(handleImg, options);

//   images.forEach(img => {
//     observer.observe(img);
//   });
// };
window.onload = () => {
  // устанавливаем настройки
  const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
    threshold: 1,
  };

  // создаем наблюдатель
  const observer = new IntersectionObserver((entries, observer) => {
    // для каждой записи-целевого элемента
    entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
        const lazyImg = entry.target;
        // выводим информацию в консоль - проверка работоспособности наблюдателя
        console.log(lazyImg);
        // меняем фон контейнера
        lazyImg.style.background = 'deepskyblue';
        // прекращаем наблюдение
        observer.unobserve(lazyImg);
      }
    });
  }, options);

  // с помощью цикла следим за всеми img на странице
  const arr = document.querySelectorAll('.container-result');
  arr.forEach(i => {
    observer.observe(i);
    console.log(i);
  });
};
