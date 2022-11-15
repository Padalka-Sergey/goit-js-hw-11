import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=31316386-df3d7a07dab36b9800dfb8d2b';
const PROP = '&image_type=photo&orientation=horizontal&safesearch=true';

async function fetchValues(value) {
  const response = await axios.get(`${BASE_URL}${KEY}&q=${value}${PROP}`);

  // if (!response.ok) {
  //   throw new Error(response.status);
  // }

  return response.data.hits;
}

export { fetchValues };

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
