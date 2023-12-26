import { openModal } from "./modal.js";

export function createCard(data, deleteCallback, likeCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__image').alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCallback);
  
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCallback);
  
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', function () {
      openImageCallback(data.link, data.name);
    });
  
    return cardElement;
  };
  
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  };
  
  export function deleteCard(evt) { 
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
  };
  
  export function openImagePopup(url, caption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
  
    popupImage.src = url;
    popupImage.alt = caption;
    popupCaption.textContent = caption;
  
    openModal(imagePopup);
  };