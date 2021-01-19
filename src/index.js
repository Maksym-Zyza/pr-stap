import './styles.css';
// import './js/modal'
// import refs from './js/refs'
// import apiService from './js/apiService'
// import updateMarkup from './js/markup'
// import scroll from './js/scroll';
// import notice from './js/notification'
import gallery from "./js/array_elements";

// ЛОГИКА:
// + При відкритті сторінки динамічно завантажуються наявні записи.
// При кліку на строку - відкривається форма над модалкою
// Форма містить детальні дані строки
// Записи сортуються від більшого значення до меншого по числах.
// По відповідних записах наявнві відбори приклад АВІТО! 

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
const refs = {
  galleryList: document.querySelector(".js-gallery"),
  activeImgOutput: document.querySelector(".js-active-tag"),
  backdrop: document.querySelector(".backdrop"),
  inform: document.querySelector('.inform_lots'),
  informLots: document.querySelector('.inform_activ_lots'),
};

function getLotsParam({date_publication, lot, expected_cost, organizer, winner, status_proc, buy_proc, lot_status, https}) {
  // if (document.documentElement.clientWidth < 500) {
  //   return `<thead class="gallery__image">
  //           <th> ${date_publication}</th>
  //           <th> ${lot}</th>
  //           <th> ${expected_cost}</th>
  //         </thead>`;
  //  }
  return `<thead class="gallery__image">
            <th> ${date_publication}</th>
            <th> ${lot}</th>
            <th> ${expected_cost}</th>
            <th> ${organizer}</th>
            <th> ${winner}</th>
            <th> ${lot_status}</th>
            <th> ${status_proc}</th>
            <th> ${buy_proc}</th>
            <th> <a href="${https}">Перейти</a></th>
          </thead>`;
}

    function getLots(gallery) {
      const list = `${gallery.map((item) => getLotsParam(item)).join("")}`;

      // filterByDate()
      filterBySum()
      filterByActivStatus()
      filterByActivLots()
      refs.inform.textContent = `Знайдено лотів: ${gallery.length}`
      return list;
    }

refs.galleryList.insertAdjacentHTML("beforeend", getLots(gallery));
// console.log(refs.inform);

    function filterByDate() {
      
      let minDate = "30.11.2020";
      let maxDate = "15.12.2020";

      minDate = minDate.split('.').reverse().join('');
      maxDate = maxDate.split('.').reverse().join('');

      const filterDateMap = gallery.map(gallery =>
        (Number((gallery.date_publication).split('.').reverse().join(''))) <= maxDate &&
        (Number((gallery.date_publication).split('.').reverse().join(''))) >= minDate);
      // console.log(filterDateMap);

      const filterDate = gallery.filter(gallery =>
        (Number((gallery.date_publication).split('.').reverse().join(''))) <= maxDate &&
        (Number((gallery.date_publication).split('.').reverse().join(''))) >= minDate);
      console.log(filterDate);
    }

function filterBySum() {
      const min = 50;
      const max = 1000000;

      const filterSum = gallery.filter(gallery =>
        (Number((gallery.expected_cost).split(' ').join('').slice(0, -3))) <= max &&
        (Number((gallery.expected_cost).split(' ').join('').slice(0, -3))) >= min);
       console.log(filterSum);

}
 
function filterByActivStatus() {
  const filterStatus = gallery.filter(gallery =>
    ((gallery.status_proc).split(' ').join('').includes("Актив")));
      console.log(filterStatus);
 }

function filterByActivLots() {
  const filterLots = gallery.filter(gallery =>
    ((gallery.lot_status).split(' ').join('').includes("Актив")));
  console.log(filterLots);
  refs.informLots.textContent = `Активних лотів: ${filterLots.length}`
  
 }
// // 2.Делегирования на галерее ul.js-gallery и получение url большого изображения.
// refs.galleryList.addEventListener("click", onElClick);

// function onElClick(event) {
//   if (event.target.nodeName !== "TH" ) {
//     console.dir(event.target);
//     return;
//   }

//   const activeEl = event.target;

//   setActiveImg(activeEl);
//   openModal(activeEl);
// }

// function setActiveImg(activeEl) {
//   const currentEl = refs.galleryList.querySelector(".js-img--active");
// console.log(currentEl);

//   if (currentEl) {
//     currentEl.classList.remove("js-img--active");
//   }

//   activeEl.classList.add("js-img--active");
// }

// // 3.Открытие модального окна по клику на элементе галереи.
// const modalDiv = document.querySelector(".js-lightbox");
// console.log(modalDiv);
// const butonClose = modalDiv.querySelector('[data-action="close-lightbox"]');
// const openImg = modalDiv.querySelector(".lightbox__image");
// const overlayDiv = modalDiv.querySelector(".lightbox__overlay");

// function openModal(img) {
//   window.addEventListener("keydown", onPressEscape);
//   modalDiv.classList.add("is-open");
//   // refs.backdrop.add("is-hidden");

//   // 4.Подмена значения атрибута src элемента img.lightbox__image.
//   gallery.find(({ preview, original }) => {
//     if (preview === img.src) {
//       openImg.src = original;
//     }
//   });
// }

// // 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// // +Закрытие модального окна по клику на div.lightbox__overlay
// // +Закрытие модального окна по нажатию клавиши ESC
// butonClose.addEventListener("click", closeModal);
// overlayDiv.addEventListener("click", closeModal);

// function closeModal() {
//   window.removeEventListener("keydown", onPressEscape);
//   modalDiv.classList.remove("is-open");
//   // refs.backdrop.remove("is-hidden");
//   // 6.Очистка значения атрибута src элемента img.lightbox__image.
//   openImg.src = "";
// }

// function onPressEscape(event) {
//   if (event.code === "Escape") {
//     closeModal();
//   }
// }


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



