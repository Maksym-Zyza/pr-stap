import './styles.css';
// import './js/modal'
import refs from './js/refs'
// import apiService from './js/apiService'
// import updateMarkup from './js/markup'
// import scroll from './js/scroll';
// import notice from './js/notification'
import gallery from "./js/array_elements";
import startSearch from './js/search-getLots'

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

  const activeEl = event.target;
  console.log(event.target);

  openModal(activeEl);
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



// refs.form.addEventListener('submit', formSubmit);

// function formSubmit(event) {
//   event.preventDefault();

//   refs.gallery.innerHTML = '';

//   const form = event.currentTarget;
//   apiService.query = form.elements.query.value;

//   apiService.resetPage();
//   fetchImages();

//   form.reset();
  
// }

// refs.button.addEventListener('click', fetchImages);

// function fetchImages() {
//   refs.button.classList.add('is-hidden');
//   refs.btnToTop.classList.remove('is-hidden');

//   apiService
//     .fetchImages()
//     .then(images => {
//       if (images.length === 0) {
//       notice.showNotice();

//         return;
//       }

//       updateMarkup(images);
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




