import './styles.css';
// // import './js/modal'
import refs from './js/refs'
// // import apiService from './js/apiService'
// // import updateMarkup from './js/markup'
// // import scroll from './js/scroll';
// // import notice from './js/notification'

// import getLots from './js/search-getLots'
import gallery from "./js/array_elements";
import startSearch from './js/search-getLots'
import galleryItem from './templates/lot-card.hbs';

// ======= Інфо про оновлення лотів ====
refs.dateUpdate.textContent = `Оновлено: 31.12.2020, 14:03:04`

// 1.Создание и рендер разметки
// startSearch -'./js/search-getLots'

// 2.Делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.galleryList.addEventListener("click", onElClick);

function onElClick(event) {
  if (event.target.nodeName !== "TH" ) {
    console.dir(event.target);
    return;
  }

  const activeEl = event.target.parentElement.dataset.id;
  console.log(event.target.parentElement.dataset.id);

  openModal(activeEl);
  fetchlotCard(activeEl);
}

// 3.Открытие модального окна по клику на элементе галереи.
const modalDiv = document.querySelector(".js-lightbox");
console.log(modalDiv);
const butonClose = modalDiv.querySelector('[data-action="close-lightbox"]');
// const overlayDiv = modalDiv.querySelector(".lightbox__overlay");

function openModal(img) {
  window.addEventListener("keydown", onPressEscape);
  modalDiv.classList.add("is-open");
}

// 4. Закрытие модального окна 
butonClose.addEventListener("click", closeModal);
// overlayDiv.addEventListener("click", closeModal);

function closeModal() {
  window.removeEventListener("keydown", onPressEscape);
  modalDiv.classList.remove("is-open");
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}


function fetchlotCard(activeEl) {

  const lot = gallery.filter(gallery =>
    ((gallery.id).includes(activeEl)));
  
  console.log({lot});

 function updateMarkup(lot) {
  const markup = galleryItem(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
 
}
 

  
//   console.log(filterLots);

    // refs.overlay.innerHTML = '';
    //   getLots(filterLots)
    // refs.overlay.insertAdjacentHTML("beforeend", getLots(filterLots));

  // if (id = id) {
    //  const markup = galleryItem(lot);
  //  }

  // refs.gallery.insertAdjacentHTML('beforeend', markup);
// }
}


// ==================================================



// refs.form.addEventListener('submit', formSubmit);

// function formSubmit(event) {
//   event.preventDefault();

//   refs.gallery.innerHTML = '';

//   const form = event.currentTarget;
//   apiService.query = form.elements.query.value;

//   apiService.resetPage();
//   fetchlots();

//   form.reset();
  
// }

// refs.button.addEventListener('click', fetchlots);

// function fetchlots() {
//   refs.button.classList.add('is-hidden');
//   refs.btnToTop.classList.remove('is-hidden');

//   apiService
//     .fetchlots()
//     .then(lot => {
//       if (lot.length === 0) {
//       notice.showNotice();

//         return;
//       }

//       updateMarkup(lot);
//       refs.button.classList.remove('is-hidden');
//       scroll();

//       if (apiService.page < 3) {
//         notice.showSuccess()
//       } else {
//       refs.btnToTop.classList.add('is-hidden');
//        }
//     })
//     .catch(({message})=> notise.showError(message));
// }




