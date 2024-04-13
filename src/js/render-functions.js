import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

export function createMarkup(arr) {
  const values = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="item">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" /></a>
        <div class="info-box">
        <p>Likes:<span class="number">${likes}</span></p>
        <p>Views:<span class="number">${views}</span></p>
        <p>Comments:<span class="number">${comments}</span></p>
        <p>Downloads:<span class="number">${downloads}</span></p>
        </div>
      </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', values);

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}
