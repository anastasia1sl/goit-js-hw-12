import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchData } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import { gallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearchClick);
loadMoreBtn.addEventListener('click', onLoadButton);

let searchQuery = '';
let currentPage = 1;
let perPage = 15;
let galleryCardHeight;

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

async function onSearchClick(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  currentPage = 1;

  searchQuery = event.currentTarget.searchQuery.value.trim();

  if (searchQuery === '') {
    loader.style.display = 'none';

    return;
  }

  try {
    const data = await fetchData(searchQuery, currentPage, perPage);
    currentPage = 1;
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

      loadMoreBtn.style.display = 'block';
      event.target.reset();
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadButton() {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchData(searchQuery, currentPage, perPage);

    const items = data.hits;
    const allItems = data.totalHits;

    createMarkup(items);
    loader.style.display = 'none';

    const card = gallery.querySelector('.item');
    if (card) {
      galleryCardHeight = card.getBoundingClientRect().height;
    }

    window.scrollBy({
      top: galleryCardHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    if (currentPage * perPage >= allItems) {
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
      });

      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
  }
}
