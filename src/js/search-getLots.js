import refs from './refs'
import gallery from "./array_elements";
import * as templ from '../templates/lots-title.js';

refs.button.addEventListener('click', startSearch);
// ======= Завантаження лотів =======

  function getLots(gallery) {
      const list = `${gallery.map((item) => templ.getLotsParam(item)).join("")}`;
      return list;
  }

  if (document.documentElement.clientWidth < 500) {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitleMobi);
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(gallery));
  } else {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitle); 
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(gallery));
  }
  refs.allLots.textContent = `${gallery.length}`

//========== Пошук ==========
function startSearch() {
  const dateStart = Number(refs.dateStart.value.replace(/-/, "").replace(/-/, ""));
  const dateEnd = Number(refs.dateEnd.value.replace(/-/, "").replace(/-/, ""));
  const sumStart = Number(refs.sumStart.value);
  const sumEnd = Number(refs.sumrEnd.value);
  const selectActiv = refs.selectActiv.value;

    filterByDate(dateStart, dateEnd, sumStart, sumEnd, selectActiv)
}

// ===== Фильтер по даті ======
function filterByDate(minDate, maxDate, sumStart, sumEnd, selectActiv) {
    
// const notCorectLots = gallery.map((gallery) =>
//      (Number(gallery.date_publication.split("").join("").replace(/\s+/g, '').replace(/,/, "."))))
//       console.log(notCorectLots);

    const filterDate = gallery.filter(gallery =>
      (Number((gallery.date_publication).split('.').reverse().join(''))) <= maxDate &&
      (Number((gallery.date_publication).split('.').reverse().join(''))) >= minDate);
      // console.log(filterDate);
    filterBySum(sumStart, sumEnd, filterDate, selectActiv)
}

// ==== Фильтер по вартості ======
function filterBySum(minSum, maxSum, arr, selectActiv) {
  
  const filterSum = arr.filter((arr) =>
     (Number(arr.expected_cost.split("").join("").replace(/\s+/g, '').replace(/,/, ".")) <= maxSum &&
      Number(arr.expected_cost.split("").join("").replace(/\s+/g, '').replace(/,/, ".")) >= minSum));
  // console.log('Фильтр по даті та сумі:',filterSum.length);

      refs.galleryList.innerHTML = '';
      getLots(filterSum)
  if (document.documentElement.clientWidth < 500) {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitleMobi);
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterSum));
  } else {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitle); 
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterSum));
  }
      refs.findLots.textContent = `Знайдено лотів за параметрами пошуку: ${filterSum.length}`
  filterByActivLots(filterSum, selectActiv)
}

// ==== Фильтер по статусу =======
function filterByActivLots(arr, selectActiv) {    

  if (selectActiv !== "Всі статуси") {
     const filterLots = arr.filter(arr =>
        ((arr.lot_status).split(' ').join('').includes(selectActiv)));

      refs.galleryList.innerHTML = '';
      getLots(filterLots)
  if (document.documentElement.clientWidth < 500) {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitleMobi);
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterLots));
  } else {
    refs.galleryList.insertAdjacentHTML("beforeend", templ.lotsTitle); 
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterLots));
  }
      refs.activLots.textContent = `Знайдено лотів за параметрами пошуку: "${selectActiv}": ${filterLots.length}`
      // console.log('Фильтр по статусу:', filterLots.length);
      refs.findLots.textContent = `Знайдено лотів зі статусом "${selectActiv}": ${filterLots.length}`
   }
  
  // Кількість Активних лотів
       selectActiv = "Активний"
    const filterLotsActiv = arr.filter(arr =>
      ((arr.lot_status).split(' ').join('').includes(selectActiv)));

    refs.activLots.textContent = `Активних лотів: ${filterLotsActiv.length}`
}