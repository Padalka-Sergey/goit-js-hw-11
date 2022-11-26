import './css/styles.css';
import { fetchValues, responseData } from './fetch/fetchValues';
// import axios from 'axios';
import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let getEl = selector => document.querySelector(selector);
// console.log('Davay')

const form = getEl('#search-form');
// const textValue = getEl('input[name=searchQuery]');
const gallery = getEl('.gallery');
const loadBtn = getEl('.load-more');

let inputFormValue = '';

let isLoading = false;
let shouldLoad = true;

let galleryLight = new SimpleLightbox('.gallery a');
let page = 1;
export { page };

form.addEventListener('submit', onFetchGallery);
loadBtn.addEventListener('click', onFetchLoadBtn);

function onFetchGallery(event) {
  event.preventDefault();
  loadBtn.classList.add('is-hidden');
  gallery.innerHTML = '';
  page = 1;
  inputFormValue = event.currentTarget.elements.searchQuery.value;

  onFetchValues();

  onSuccess();
}

// ==============================================

window.addEventListener(
  'scroll',
  throttle(() => {
    throttleScroll();
  }, 250)
);

function throttleScroll() {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop >= scrollHeight - clientHeight - 1000) {
    onFetchLoadBtn();
  }
}

// ==============================================

function onFetchLoadBtn(event) {
  // event.preventDefault();
  if (isLoading || !shouldLoad) return;
  isLoading = true;

  onFetchValues();
}

function onMarkup(dataInput) {
  // console.log(dataInput);
  if (dataInput.length === 0 || dataInput.length === undefined) {
    onEmpty();
    return;
  }

  if (dataInput.length === undefined) {
    return;
  }

  const markupGallery = dataInput
    .map(item => {
      return `
              <div class="photo-card">
                  <a href="${item.largeImageURL}">
                   <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
                  </a>
                  <div class="info">
                      <p class="info-item"><b>Likes</b><span>${item.likes}<span/></p>
                      <p class="info-item"><b>Views</b><span>${item.views}<span/></p>
                      <p class="info-item"><b>Comments</b><span>${item.comments}<span/></p>
                      <p class="info-item"><b>Downloads</b><span>${item.downloads}<span/></p>
                  </div>
              </div> `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markupGallery);
  galleryLight.refresh();
  // const { height: cardHeight } = document
  //   .querySelector('.gallery')
  //   .firstElementChild.getBoundingClientRect();

  // window.scrollBy({
  //   top: cardHeight * 2,
  //   behavior: 'smooth',
  // });
  // loadBtn.classList.remove('is-hidden');
  if (page * 40 - 40 >= responseData.totalHits) {
    // loadBtn.classList.add('is-hidden');
    console.log(responseData);
    shouldLoad = false;
    onNotifInfo();
  }
  isLoading = false;
}

const onSuccess = () => {
  setTimeout(() => {
    onNotifSuccess();
  }, 1000);
};

function onNotifSuccess() {
  Notiflix.Notify.success(
    `Hooray! We found ${responseData.totalHits} images.`,
    {
      timeout: 6000,
    }
  );
}

function onNotifInfo() {
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results.`,
    {
      timeout: 6000,
    }
  );
}

function onEmpty() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 3000,
    }
  );
}

function onFetchValues() {
  fetchValues(inputFormValue)
    .then(onMarkup)
    .catch(error => {
      console.log(error);
    });
}
