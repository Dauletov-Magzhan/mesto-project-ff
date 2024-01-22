// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { closeModal, openModal } from "./scripts/modal.js";
import { clearValidation, enableValidation } from './scripts/validation.js';
import { editProfileApi, addNewCardApi, loadProfileAndCards, addNewAvatar } from './scripts/api.js';


const placesList = document.querySelector('.places__list');
const displayNameElement = document.querySelector('.profile__title');
const displayJobElement = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewAvatar = document.querySelector('.popup_type_new_avatar')
const popupCloseBtn = document.querySelectorAll('.popup__close');
const avatarSubmitBtn = popupTypeNewAvatar.querySelector('.popup__button');
const profileSubmitBtn = popupTypeEdit.querySelector('.popup__button');
const newCardSubmitBtn = popupTypeNewCard.querySelector('.popup__button');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

let currentUserId;

profileImage.addEventListener("click", () => {
    clearValidation(avatarForm, validationConfig);
    avatarForm.reset();
    openModal(popupTypeNewAvatar);
});

function handleAvatarFormSubmit(evt) {
    avatarSubmitBtn.textContent = avatarSubmitBtn.getAttribute("data-loading");
    evt.preventDefault();
    addNewAvatar(avatarForm.link.value)
        .then((updatedAvatar) => {
            profileImage.style.backgroundImage = `url(${updatedAvatar.avatar})`;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            avatarSubmitBtn.textContent = avatarSubmitBtn.getAttribute("data-default-text");
            closeModal(popupTypeNewAvatar);
        });
};

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

profileEditBtn.addEventListener('click', function () {
    nameInput.value = displayNameElement.textContent;
    jobInput.value = displayJobElement.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(popupTypeEdit);
});

function editProfile(evt) {
    profileSubmitBtn.textContent = profileSubmitBtn.getAttribute("data-loading");
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    editProfileApi(newName, newJob)
        .then((updatedProfile) => {
            displayNameElement.textContent = updatedProfile.name;
            displayJobElement.textContent = updatedProfile.about;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            profileSubmitBtn.textContent = profileSubmitBtn.getAttribute("data-default-text");
            closeModal(popupTypeEdit);
        });
};

profileForm.addEventListener('submit', editProfile);

profileAddBtn.addEventListener('click', function () {
    clearValidation(cardForm, validationConfig);
    openModal(popupTypeNewCard);
});

popupCloseBtn.forEach(function (button) {
    const popupClose = button.closest('.popup');
    button.addEventListener('click', function() {
        closeModal(popupClose);
    });
});

function addNewCard(evt) {
    newCardSubmitBtn.textContent = newCardSubmitBtn.getAttribute("data-loading");
    evt.preventDefault();
  
    const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
    const cardUrlInput = cardForm.querySelector('.popup__input_type_url'); 
    const CardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };

    addNewCardApi(CardData)
        .then((data) => {
            const newCard = createCard(data, deleteCard, likeCard, openImagePopup, currentUserId);
            placesList.prepend(newCard);
            closeModal(popupTypeNewCard);
            cardForm.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            newCardSubmitBtn.textContent = newCardSubmitBtn.getAttribute("data-default-text");
        });
};

cardForm.addEventListener('submit', addNewCard);

function openImagePopup(url, caption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
  
    popupImage.src = url;
    popupImage.alt = caption;
    popupCaption.textContent = caption;
  
    openModal(imagePopup);
  };

//Валидация
enableValidation(validationConfig);

//API
loadProfileAndCards()
    .then(([user, initialCards]) => {
        currentUserId = user._id;
        displayNameElement.textContent = user.name;
        displayJobElement.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;

        initialCards.forEach(function (data) {
            const card = createCard(data, deleteCard, likeCard, openImagePopup, currentUserId);
            placesList.append(card);
        });

        return initialCards;
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
});
