// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { initialCards, createCard } from "./scripts/cards.js";
import { closeModal, openModal, openImagePopup } from "./scripts/modal.js";


const placesList = document.querySelector('.places__list');

initialCards.forEach(function (cardData) {
    const card = createCard(cardData, deleteCard);
    placesList.append(card);
});

function deleteCard(evt) { 
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
};


const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
profileEditBtn.addEventListener('click', function () {
    openModal(popupTypeEdit);
});

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


const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const displayNameElement = document.querySelector('.profile__title');
const displayJobElement = document.querySelector('.profile__description');

nameInput.value = displayNameElement.textContent;
jobInput.value = displayJobElement.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    displayNameElement.textContent = newName;
    displayJobElement.textContent = newJob;
    
    closeModal(popupTypeEdit);
};

formElement.addEventListener('submit', handleFormSubmit);

function addNewCard(evt) {
    evt.preventDefault();
  
    const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
    const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
  
    const newCardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };
  
    const newCard = createCard(newCardData, deleteCard);
  
    placesList.prepend(newCard);
  
    closeModal(popupTypeNewCard);
    cardForm.reset(); 
  };

const cardForm = document.forms['new-place'];
cardForm.addEventListener('submit', addNewCard, );


const cardImage = document.querySelectorAll('.card__image');
cardImage.forEach(function (image) {
    image.addEventListener('click', function () {
        const cardUrl = image.src;
        const cardCaption = image.alt;

        openImagePopup(cardUrl, cardCaption);
    });
});


