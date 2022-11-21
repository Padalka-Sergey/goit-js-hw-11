import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=31316386-df3d7a07dab36b9800dfb8d2b';
const PROP = '&image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = '&&per_page=40';
let page = 1;
let responseData = null;

async function fetchValues(value) {
  if (page > 13) {
    return;
  }
  console.log(page);
  const response = await axios.get(
    `${BASE_URL}${KEY}&q=${value}${PROP}&page=${page}${PER_PAGE}`
  );

  page += 1;
  responseData = response.data;
  //   console.log(responseData);
  //   console.log(responseData.totalHits);
  return responseData.hits;
}

export { fetchValues, responseData, page };
