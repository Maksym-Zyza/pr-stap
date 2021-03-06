const refs = {
  dateStart: document.querySelector('#date_start'),
  dateEnd: document.querySelector('#date_end'),
  sumStart: document.querySelector('#select-start'),
  sumrEnd: document.querySelector('#select-end'),
  selectActiv: document.querySelector('#select'),

  dateUpdate: document.querySelector('.date_update'),
  findLots: document.querySelector('.find_lots'),
  activLots: document.querySelector('.activ_lots'),
  allLots: document.querySelector('.all_lots'),

  button: document.querySelector('.load-more-button'),
  btnToTop: document.querySelector('.toTopBtn'),

  galleryList: document.querySelector(".js-gallery"),
  galleryLot: document.querySelector(".gallery_lot"),
  backdrop: document.querySelector(".backdrop"),
  activeImgOutput: document.querySelector(".js-active-tag"),

  lightbox: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),

};

export default refs;

// const refs = {
//   form: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   modalDiv: document.querySelector('.js-lightbox'),
//   btnClose: document.querySelector('.lightbox__button'),
//   overlayDiv: document.querySelector('.lightbox__overlay'),
//   openImg: document.querySelector('.lightbox__image'),
// };