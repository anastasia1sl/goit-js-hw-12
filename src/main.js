import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchData } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import { gallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', onSearchClick);

let searchQuery = '';
loader.style.display = 'none';

function onSearchClick(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  loader.style.display = 'block';

  searchQuery = event.currentTarget.searchQuery.value.trim();

  if (searchQuery === '') {
    loader.style.display = 'none';

    return;
  }

  fetchData(searchQuery)
    .then(data => {
      const items = data.hits;

      if (items.length === 0) {
        loader.style.display = 'none';
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loader.style.display = 'none';
        createMarkup(items);

        event.target.reset();
      }
    })
    .catch(error => console.log(error));
}
