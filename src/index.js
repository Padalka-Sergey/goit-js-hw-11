import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
// import throttle from 'lodash.throttle';

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

let getEl = selector => document.querySelector(selector);

const form = getEl('#search-form');
// const textValue = getEl('input[name=searchQuery]');
const gallery = getEl('.gallery');
const loadBtn = getEl('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=31316386-df3d7a07dab36b9800dfb8d2b';
const PROP = '&image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = '&&per_page=40';
let page = 1;
let inputFormValue = '';
let responseData = null;

let galleryLight = new SimpleLightbox('.gallery a');

async function fetchValues(value) {
  console.log(page);
  const response = await axios.get(
    `${BASE_URL}${KEY}&q=${value}${PROP}&page=${page}${PER_PAGE}`
  );

  // if (!response.ok) {
  //   throw new Error(response.status);
  // }
  page += 1;
  responseData = response.data;
  // onNotifSuccess();
  console.log(responseData.totalHits);
  return responseData.hits;
}

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

function onFetchLoadBtn(event) {
  event.preventDefault();

  onFetchValues();
}

function onMarkup(dataInput) {
  console.log(dataInput);
  if (dataInput.length === 0) {
    onEmpty();
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
  loadBtn.classList.remove('is-hidden');
  console.log(page);
  if (page * 40 - 40 >= responseData.totalHits) {
    loadBtn.classList.add('is-hidden');
    onNotifInfo();
  }
}

// const galleryLight = new SimpleLightbox('.gallery a');

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
