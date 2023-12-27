// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { closeModal, openModal } from "./scripts/modal.js";


const placesList = document.querySelector('.places__list');

initialCards.forEach(function (cardData) {
    const card = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placesList.append(card);
});


const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
profileEditBtn.addEventListener('click', function () {
    nameInput.value = displayNameElement.textContent;
    jobInput.value = displayJobElement.textContent;
    openModal(popupTypeEdit);
});


const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const displayNameElement = document.querySelector('.profile__title');
const displayJobElement = document.querySelector('.profile__description');

function editProfile(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    displayNameElement.textContent = newName;
    displayJobElement.textContent = newJob;
    
    closeModal(popupTypeEdit);
};

profileForm.addEventListener('submit', editProfile);


const profileAddBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
profileAddBtn.addEventListener('click', function () {
    openModal(popupTypeNewCard);
});


const popupCloseBtn = document.querySelectorAll('.popup__close');
popupCloseBtn.forEach(function (button) {
    const popupClose = button.closest('.popup');
    button.addEventListener('click', function() {
        closeModal(popupClose);
    });
});


function addNewCard(evt) {
    evt.preventDefault();
  
    const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
    const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
  
    const newCardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };
  
    const newCard = createCard(newCardData, deleteCard, likeCard, openImagePopup);
  
    placesList.prepend(newCard);
  
    closeModal(popupTypeNewCard);
    cardForm.reset(); 
  };

const cardForm = document.forms['new-place'];
cardForm.addEventListener('submit', addNewCard );


function openImagePopup(url, caption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
  
    popupImage.src = url;
    popupImage.alt = caption;
    popupCaption.textContent = caption;
  
    openModal(imagePopup);
  };