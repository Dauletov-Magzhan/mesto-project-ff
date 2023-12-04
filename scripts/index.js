// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(data, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__image').alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

function deleteCard(evt) { 
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
};

const placesList = document.querySelector('.places__list');

initialCards.forEach(function (cardData) {
    const card = createCard(cardData, function (card) {
        deleteCard(card);
    });

    placesList.append(card);
});