import { deleteCardApi, putLikeApi, deleteLikeApi } from "./api";

export function createCard(data, deleteCallback, likeCallback, openImageCallback, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  const likesCount = cardElement.querySelector('.card__likes_count');
  likesCount.textContent = data.likes.length;

  if (data.owner._id === currentUserId) {
    deleteButton.addEventListener('click', (evt) => {
      deleteCallback(evt, data._id);
    });
  }
  else {
      deleteButton.style.display = 'none';
  };

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => {
    likeCallback(evt, data, cardElement);
  });


  function showCurrentLike() {
    const likesArray = data.likes;
    if (likesArray.some(like => like._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    };
};

  showCurrentLike();
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', function () {
    openImageCallback(data.link, data.name);
  });

  return cardElement;
};

export function likeCard(evt, data, cardElement) {
  const likesCount = cardElement.querySelector('.card__likes_count');
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLikeApi : putLikeApi;
  likeMethod(data._id) 
    .then((card) => {
      evt.target.classList.toggle("card__like-button_is-active"); 
      likesCount.textContent = card.likes.length;
    })
    .catch(err => console.log(err));
};

export function deleteCard(evt, cardId) { 
  deleteCardApi(cardId)
  .then(() => evt.target.closest('.places__item').remove())
  .catch((err) => console.log(`Ошибка: ${err}`));
};
