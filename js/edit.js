import {
    updateSneakers,
    getUrlVars
} from './crud.js';

import {
    Sneakers
} from './model.js';


const ADDRESS = "http://127.0.0.1:8000/sneaker/"

const updateButton = document.getElementById("edit-button")
const closeButton = document.getElementById("close-button")
const modalThing = document.getElementById("modal-popup")

const id = getUrlVars()["id"];

(async() => {
    if (!updateButton)
        return
    const sneaker = await (await fetch(ADDRESS + id, { method: 'GET' })).json()
    console.log(sneaker)
    document.getElementById("header-input").value = sneaker.header
    document.getElementById("description-input").value = sneaker.description
    document.getElementById("price-input").value = sneaker.price
})()

updateButton.addEventListener('click', (event) => {
    event.preventDefault();

    let header = document.getElementById('header-input');
    let description = document.getElementById('description-input');
    let price = document.getElementById('price-input');

    const getInputValues = () => {
        return {
            id: id,
            header: header.value,
            description: description.value,
            price: price.value,
        };
    };

    if (header.value == '' || description.value == '' || price.value == '') {
        modalThing.style.display = 'block';
    }

    updateSneakers(id, getInputValues());
    window.location.href = '/';
})

closeButton.addEventListener('click', (event) => {
    event.preventDefault();

    modalThing.style.display = 'none';
});