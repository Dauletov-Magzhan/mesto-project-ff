// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { closeModal, openModal } from "./scripts/modal.js";
import { clearValidation, enableValidation } from './scripts/validation.js';
import { editProfileApi, getUser, initialCardsApi, addNewCardApi, loadProfileAndCards, deleteCardApi } from './scripts/api.js';


const placesList = document.querySelector('.places__list');
const displayNameElement = document.querySelector('.profile__title');
const displayJobElement = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

let currentUser 
let ownerId
let cardId
// initialCards.forEach(function (cardData) {
//     const card = createCard(cardData, deleteCard, likeCard, openImagePopup);
//     placesList.append(card);
// });

profileEditBtn.addEventListener('click', function () {
    nameInput.value = displayNameElement.textContent;
    jobInput.value = displayJobElement.textContent;
    clearValidation(profileForm);
    openModal(popupTypeEdit);
});

function editProfile(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    displayNameElement.textContent = newName;
    displayJobElement.textContent = newJob;

    editProfileApi(newName, newJob)
    
    closeModal(popupTypeEdit);
};

profileForm.addEventListener('submit', editProfile);

profileAddBtn.addEventListener('click', function () {
    clearValidation(cardForm);
    openModal(popupTypeNewCard);
});

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
        link: cardUrlInput.value,
        owner: {
            _id: ownerId
        },
        _id: cardId
    };

    const newCard = createCard(newCardData, deleteCard, likeCard, openImagePopup, currentUser);
    addNewCardApi(newCardData)

    placesList.prepend(newCard);
    closeModal(popupTypeNewCard);
    cardForm.reset(); 
  };

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

//Валидация
enableValidation();

//API
loadProfileAndCards()
    .then(([user, initialCards]) => {
        currentUser = user._id
        displayNameElement.textContent = user.name;
        displayJobElement.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;

        initialCards.forEach(function (data) {
            const card = createCard(data, deleteCard, likeCard, openImagePopup, currentUser);
            ownerId = data.owner._id
            cardId = data._id
            const likesCount = card.querySelector('.card__likes_count')
            likesCount.textContent = data.likes.length
            placesList.append(card);
        });

        return initialCards;
    })
    .catch((err) => {
        console.log(err);
});
