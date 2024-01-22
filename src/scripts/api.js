const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: '5127d628-3fb9-4d4d-aa00-4a0279b3c5ac',
      'Content-Type': 'application/json'
    }
  }
  

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};


export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => handleResponse(res));
};

export const getInitialCardsApi = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => handleResponse(res));
};

export const editProfileApi = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
          })
    })
    .then((res) => handleResponse(res))
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });
};

export const addNewCardApi = (newCardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCardData)
    })
    .then((res) => handleResponse(res))
};

export const loadProfileAndCards =() => {
    return Promise.all([getUser(), getInitialCardsApi()]);
};

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
      .then(res => handleResponse(res));
};

export const putLikeApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
    .then((res) => {
        return res;
    });
};

export const deleteLikeApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => handleResponse(res))
    .then((res) => {
        return res;
    });
};

export const addNewAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    })
    .then((res) => handleResponse(res))
    .then((res) => {
        return res;
    });
};