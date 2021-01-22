import refs from './refs';
import galleryItem from '../templates/image-card.hbs';

function updateMarkup(item) {
  const markup = galleryItem(item);
  refs.overlay.insertAdjacentHTML('beforeend', markup);
}

export default updateMarkup;