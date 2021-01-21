import refs from './refs'
import gallery from "./array_elements";

// export default startSearch

refs.button.addEventListener('click', startSearch);
// ======= Завантаження лотів =======
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
            <th> <a href="${https}" target="_blank">Перейти</a></th>
          </thead>`;
}
    function getLots(gallery) {
      const list = `${gallery.map((item) => getLotsParam(item)).join("")}`;
      return list;
    }
refs.galleryList.insertAdjacentHTML("beforeend", getLots(gallery));
refs.allLots.textContent = `${gallery.length}`

//========== Пошук ==========
function startSearch() {
//   refs.button.classList.add('is-hidden');
//   refs.btnToTop.classList.remove('is-hidden');

  const dateStart = Number(refs.dateStart.value.replace(/-/, "").replace(/-/, ""));
  const dateEnd = Number(refs.dateEnd.value.replace(/-/, "").replace(/-/, ""));
  const sumStart = Number(refs.sumStart.value);
  const sumEnd = Number(refs.sumrEnd.value);
  const selectActiv = refs.selectActiv.value;

    filterByDate(dateStart, dateEnd, sumStart, sumEnd, selectActiv)
}

// ===== Фильтер по даті ======
    function filterByDate(minDate, maxDate, sumStart, sumEnd, selectActiv) {
    
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
  console.log('Фильтр по даті та сумі:',filterSum.length);

  refs.galleryList.innerHTML = '';
      getLots(filterSum)
      refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterSum));
      // refs.lots.textContent = `Знайдено лотів: ${filterSum.length}`
  filterByActivLots(filterSum, selectActiv)
}

// ==== Фильтер по статусу =======
function filterByActivLots(arr, selectActiv) {
  // const mapLots = arr.map(arr =>
  //   ((arr.lot_status).split(' ').join('').includes(selectActiv)));
  // console.log(mapLots);
  
    const filterLots = arr.filter(arr =>
      ((arr.lot_status).split(' ').join('').includes(selectActiv)));

    refs.galleryList.innerHTML = '';
      getLots(filterLots)
    refs.galleryList.insertAdjacentHTML("beforeend", getLots(filterLots));
      
      refs.activLots.textContent = `Знайдено лотів зі статусом: "${selectActiv}": ${filterLots.length}`
    
       console.log('Фильтр по статусу:',filterLots.length);

    // if (filterLots.length === 0) {
    //    refs.galleryList.innerHTML = '';
    //   getLots(arr)
    //   refs.galleryList.insertAdjacentHTML("beforeend", getLots(arr));
    //   refs.lots.textContent = `${arr.length}`
    //   refs.activLots.textContent = `${filterLots.length}`
  // } 
}