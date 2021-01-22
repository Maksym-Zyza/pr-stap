const lotsTitle = `<thead class="gallery__item table_title">
    <tr>
        <th>Дата</th>
        <th>Лот</th>
        <th>Очікувана вартість</th>
        <th>Організатор</th>
        <th>Переможець</th>
        <th>Статус лота</th>
        <th>Статус процедури</th>
        <th>Процедура закупівлі</th>
        <th>Посилання</th>
    </tr>
</thead>`

const lotsTitleMobi = `<thead class="gallery__item table_title">
    <tr>
        <th>Дата</th>
        <th>Лот</th>
        <th>Очікувана вартість</th>
    </tr>
</thead>`

function getLotsParam({ id, date_publication, lot, expected_cost, organizer, winner, status_proc, buy_proc, lot_status, https }) {
  
    if (document.documentElement.clientWidth < 500) {
  
        return `<thead class="gallery_lot">
          <tr data-id="${id}">
            <th> ${date_publication}</th>
            <th> ${lot}</th>
            <th class="sum">${expected_cost}</th>
          </tr>  
          </thead>`;
    } else { 
        return `<thead class="gallery_lot">
          <tr data-id="${id}">
            <th> ${date_publication}</th>
            <th> ${lot}</th>
            <th class="sum">${expected_cost}</th>
            <th> ${organizer}</th>
            <th> ${winner}</th>
            <th> ${lot_status}</th>
            <th> ${status_proc}</th>
            <th> ${buy_proc}</th>
            <th> <a href="${https}" target="_blank"><span class="lot_link">Перейти</span></a></th>
          </tr>  
          </thead>`;
    }
}

export {lotsTitle, lotsTitleMobi, getLotsParam}