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
  dateStart: document.querySelector('#date_start'),
  dateEnd: document.querySelector('#date_end'),
  sumStart: document.querySelector('#select-start'),
  sumrEnd: document.querySelector('#select-end'),
  selectActiv: document.querySelector('#select'),

  inform: document.querySelector('.inform_lots'),
  informLots: document.querySelector('.inform_activ_lots'),
  dateUpdate: document.querySelector('.date_update'),

  button: document.querySelector('.load-more-button'),
  btnToTop: document.querySelector('.toTopBtn'),

  galleryList: document.querySelector(".js-gallery"),
  backdrop: document.querySelector(".backdrop"),
  activeImgOutput: document.querySelector(".js-active-tag"),
};

// Дата оновлення даних
refs.dateUpdate.textContent = `Оновлено: 31.12.2020, 14:03:04`
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
      return list;
    }
refs.galleryList.insertAdjacentHTML("beforeend", getLots(gallery));
// console.log(refs.inform);
      refs.inform.textContent = `Знайдено лотів: ${gallery.length}`
      refs.informLots.textContent = `Активних лотів: ${gallery.length}`

// Пошук
refs.button.addEventListener('click', startSearch);

function startSearch() {
  refs.button.classList.add('is-hidden');
  refs.btnToTop.classList.remove('is-hidden');

     
  console.dir(refs.sumStart.value);
  console.log(refs.sumrEnd.value);
  console.log(refs.selectActiv.value);

  const dateStart = Number(refs.dateStart.value.replace(/-/, "").replace(/-/, ""));
  const dateEnd = Number(refs.dateEnd.value.replace(/-/, "").replace(/-/, ""));
  const sumStart = Number(refs.sumStart.value);
  const sumEnd = Number(refs.sumrEnd.value);
  const selectActiv = refs.selectActiv.value;

      console.log(dateStart);
      console.log(dateEnd);
      console.log(sumStart);
      console.log(sumEnd);
      console.log(selectActiv);

    filterByDate(dateStart, dateEnd, sumStart, sumEnd, selectActiv)
  
}

// ==== Фильтер по даті
    function filterByDate(minDate, maxDate, sumStart, sumEnd, selectActiv) {
    
      const filterDate = gallery.filter(gallery =>
        (Number((gallery.date_publication).split('.').reverse().join(''))) <= maxDate &&
        (Number((gallery.date_publication).split('.').reverse().join(''))) >= minDate);
      console.log(filterDate);
      
      filterBySum(sumStart, sumEnd, filterDate, selectActiv)
    }

// ==== Фильтер по вартості
function filterBySum(minSum, maxSum, arr, selectActiv) {
  
  const filterSum = arr.filter((arr) =>
     (Number(arr.expected_cost.split("").join("").replace(/\s+/g, '').replace(/,/, ".")) <= maxSum &&
      Number(arr.expected_cost.split("").join("").replace(/\s+/g, '').replace(/,/, ".")) >= minSum));
  console.log(filterSum);

  refs.galleryList.innerHTML = '';
      getLots(filterSum)
      refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterSum));
      refs.inform.textContent = `Знайдено лотів: ${filterSum.length}`
      refs.informLots.textContent = `Активних лотів: ${filterSum.length}`

  // refs.inform.textContent = `Знайдено лотів: ${arr.length}`
  // refs.informLots.textContent = `Активних лотів: ${arr.length}`
  filterByActivLots(filterSum, selectActiv)
}

// ==== Фильтер по статусу лотів
function filterByActivLots(arr, selectActiv) {
  // const mapLots = arr.map(arr =>
  //   ((arr.lot_status).split(' ').join('').includes(selectActiv)));
  // console.log(mapLots);
  
    const filterLots = arr.filter(arr =>
      ((arr.lot_status).split(' ').join('').includes(selectActiv)));

    refs.galleryList.innerHTML = '';
      getLots(filterLots)
      refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterLots));
      refs.inform.textContent = `Знайдено лотів: ${filterLots.length}`
      refs.informLots.textContent = `Активних лотів: ${filterLots.length}`
    
  console.log(filterLots.length);
    if (filterLots.length === 0) {
       refs.galleryList.innerHTML = '';
      getLots(arr)
      refs.galleryList.insertAdjacentHTML("beforeend", getLots(arr));
      refs.inform.textContent = `Знайдено лотів: ${arr.length}`
      refs.informLots.textContent = `Активних лотів: ${arr.length}`
  } 
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




