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
    clearValidation(profileForm)
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
    clearValidation(cardForm)
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


// Валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 


function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement){
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    };

    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};


function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };

enableValidation()

function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
function toggleButtonState(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    }
  }

function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement)
    });
}