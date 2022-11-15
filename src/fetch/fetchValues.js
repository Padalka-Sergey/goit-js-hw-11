// import axios from 'axios';
// import { page } from '../index.js';
// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '?key=31316386-df3d7a07dab36b9800dfb8d2b';
// const PROP = '&image_type=photo&orientation=horizontal&safesearch=true';
// const PER_PAGE = '&&per_page=40';
// let page = 1;

// async function fetchValues(value) {
//   console.log(page);
//   const response = await axios.get(
//     `${BASE_URL}${KEY}&q=${value}${PROP}&page=${page}${PER_PAGE}`
//   );

// if (!response.ok) {
//   throw new Error(response.status);
// }

//   response => {
//     page += 1;
//     return response.data.hits;
//   };
// }

// export { fetchValues };
// export { page };

// =============================================
// import axios from 'axios';
// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '?key=31316386-df3d7a07dab36b9800dfb8d2b';
// const PROP = '&image_type=photo&orientation=horizontal&safesearch=true';
// function fetchValues(value) {
//   return fetch(`${BASE_URL}${KEY}&q=${value}${PROP}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })

//     .then(data => {
//       console.log(data.hits);
//       return data.hits;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// export { fetchValues };
