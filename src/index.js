import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

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
                  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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
  loadBtn.classList.remove('is-hidden');
  console.log(page);
  if (page * 40 - 40 >= responseData.totalHits) {
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`,
      {
        timeout: 6000,
      }
    );
  }
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
