// Интеграция с API
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
    headers: {
      authorization: '5127d628-3fb9-4d4d-aa00-4a0279b3c5ac',
      'Content-Type': 'application/json'
    }
  }
  
export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(res.status)
        })
}

export const initialCardsApi = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(res.status)
        })
}

export const editProfileApi = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
          })
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
        return Promise.reject(res.status)
    })
    .catch((err) => {
        console.log(err)
    })
}

export const addNewCardApi = (newCardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCardData)
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        }
        return Promise.reject(res.status)
    })
    .then((res) => {
        return res
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  }

export async function loadProfileAndCards() {
    return await Promise.all([getUser(), initialCardsApi()])
}