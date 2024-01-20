import { deleteCardApi, putLikeApi, deleteLikeApi } from "./api";

export function createCard(data, deleteCallback, likeCallback, openImageCallback, currentUser) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (data.owner._id === currentUser) {
    deleteButton.addEventListener('click', (evt) => {
      deleteCallback(evt, data._id);
    });
  }
  else {
      deleteButton.style.display = 'none';
  };

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => {
    likeCallback(evt, data._id, cardElement);
  });


  function showCurrentLike() {
    const likesArray = Array.from(data.likes || []);
    if (likesArray.some(like => like._id === currentUser)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    };
};

showCurrentLike();
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    openImageCallback(data.link, data.name);
  });

  return cardElement;
};

export function likeCard(evt, cardId, cardElement) {
  const likesCount = cardElement.querySelector('.card__likes_count');
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  if (isLiked) {
      deleteLikeApi(cardId)
          .then((card) => {
              evt.target.classList.remove("card__like-button_is-active");
              likesCount.textContent = card.likes.length;
          })
          .catch((err) => {
              console.log(`Ошибка: ${err}`);
          });
  } else {
      putLikeApi(cardId)
          .then((card) => {
              evt.target.classList.add("card__like-button_is-active");
              likesCount.textContent = card.likes.length;
          })
          .catch((err) => {
              console.log(`Ошибка: ${err}`);
          });
  };
};

export function deleteCard(evt, cardId) { 
  deleteCardApi(cardId)
  .then(() => evt.target.closest('.places__item').remove())
  .catch((err) => console.log(`Ошибка: ${err}`));
};
