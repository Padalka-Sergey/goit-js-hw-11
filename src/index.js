import './css/styles.css';
// import axios from 'axios';
import { fetchValues } from './fetch/fetchValues';
// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

let getEl = selector => document.querySelector(selector);

const form = getEl('#search-form');
const gallery = getEl('.gallery');
form.addEventListener('submit', onFetchGallery);

function onFetchGallery(event) {
  event.preventDefault();

  const inputFormValue = event.currentTarget.elements.searchQuery.value;
  console.log(inputFormValue);
  // fetchValues(inputFormValue).then(onMarkup).catch(onError);
  fetchValues(inputFormValue)
    .then(onMarkup)
    .catch(error => {
      console.log(error);
    });
}

function onMarkup(dataInput) {
  gallery.innerHTML = '';
  // onEmpty();
  // console.log(dataInput);
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
}

function onEmpty() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 3000,
    }
  );
}
