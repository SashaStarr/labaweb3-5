import {
    getSneakers
} from './crud.js';

import {
    Sneakers,
    addSneakers
} from './model.js';

const ADDRESS = "http://127.0.0.1:8000/equip/"

const sortButton = document.getElementById('button-sort');
const priceButton = document.getElementById('button-count');
const createButton = document.getElementById('button-create');
const searchButton = document.getElementById('button__search');
const mainContainer = document.getElementById('main__container');
const clearButton = document.getElementById('button__clear');
let sneakerList = [];

var counter = 1;


function updateDOM(givenList) {
    var elements = mainContainer.querySelectorAll('.main__sneaker');
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    for (var i = 0; i < givenList.length; i++) {
        var id = givenList[i].id;
        var header = givenList[i].header;
        var descriptionText = givenList[i].description;
        var price = givenList[i].price;
        addSneakers({ id, header, descriptionText, price }, Load);
    }
};

export const fetchAllContent = async() => {
    const allContent = await getSneakers();

    sneakerList = allContent;

    updateDOM(sneakerList);
};

sortButton.addEventListener('click', (event) => {
    event.preventDefault();
    sortButton.classList.toggle('active');
    document.getElementById('button-sort__circle').classList.toggle('active');
    sneakerList.sort((o1, o2) => o2.price - o1.price);
    updateDOM(sneakerList);
});

priceButton.addEventListener('click', (event) => {
    event.preventDefault();
    var totalPrice = sneakerList.reduce((counter, item) => (counter += item.price), 0);
    document.getElementById('expenses-count').innerText = totalPrice + '$';
});

createButton.addEventListener('click', (event) => {
    event.preventDefault();
    var id = counter;
    counter += 1;
    var header = `AirMax 270`;
    var descriptionText = 'Красиві';
    var price = Math.floor(Math.random() * 100);
    var sneakerss = new Sneakers(id, header, descriptionText, price);
    sneakerList.push(sneakerss);
    addSneakers({ id, header, descriptionText, price });
    sortButton.classList.remove('active');
    document.getElementById('button-sort__circle').classList.remove('active');
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    var text = document.getElementById("input__search").value;
    var pattern = new RegExp(text);
    var filteredList = sneakerList.filter(sneaker => pattern.test(sneaker.header));
    updateDOM(filteredList);
});

clearButton.addEventListener('click', (event) => {
    updateDOM(sneakerList);
});

async function Load() {
    sneakerList.length = 0;
    sneakerList.push(...(await (await fetch(ADDRESS)).json()))
    updateDOM(sneakerList);
}

window.addEventListener('load', Load)