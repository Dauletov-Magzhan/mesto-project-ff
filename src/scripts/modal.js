export function openModal (popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', keyHandler)
    document.addEventListener('click', mouseHandler)
}

export function closeModal (popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', keyHandler)
    document.removeEventListener('click', mouseHandler)
}

function keyHandler (evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened')
    closeModal(popup)
  }
}

function mouseHandler (evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target)
  }
}

export function openImagePopup(url, caption) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = url;
  popupImage.alt = caption;
  popupCaption.textContent = caption;

  openModal(imagePopup);
}