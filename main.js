(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0);return o.querySelector(".card__image").src=e.link,o.querySelector(".card__image").alt=e.name,o.querySelector(".card__title").textContent=e.name,o.querySelector(".card__delete-button").addEventListener("click",t),o.querySelector(".card__like-button").addEventListener("click",n),o.querySelector(".card__image").addEventListener("click",(function(){r(e.link,e.name)})),o}function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.target.closest(".places__item").remove()}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),document.addEventListener("click",a)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),document.removeEventListener("click",a)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function a(e){e.target.classList.contains("popup_is-opened")&&o(e.target)}var p=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,n,t,k);p.append(o)}));var d=document.querySelector(".profile__edit-button"),i=document.querySelector(".popup_type_edit");d.addEventListener("click",(function(){s.value=m.textContent,l.value=_.textContent,r(i)}));var u=document.forms["edit-profile"],s=u.elements.name,l=u.elements.description,m=document.querySelector(".profile__title"),_=document.querySelector(".profile__description");u.addEventListener("submit",(function(e){e.preventDefault();var t=s.value,n=l.value;m.textContent=t,_.textContent=n,o(i)}));var v=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_new-card");v.addEventListener("click",(function(){r(y)})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){o(t)}))}));var f=document.forms["new-place"];function k(e,t){var n=document.querySelector(".popup_type_image"),o=n.querySelector(".popup__image"),c=n.querySelector(".popup__caption");o.src=e,o.alt=t,c.textContent=t,r(n)}f.addEventListener("submit",(function(r){r.preventDefault();var c=f.querySelector(".popup__input_type_card-name"),a=f.querySelector(".popup__input_type_url"),d=e({name:c.value,link:a.value},n,t,k);p.prepend(d),o(y),f.reset()}))})();