class Sneakers {
    constructor(material, color, descriptionText, price) {
        this.material = material;
        this.color = color;
        this.descriptionText = descriptionText;
        this.price = price;
    }
}

const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.getElementById("sort");
const countBtn = document.getElementById("count");
const clearButton = document.getElementById('button__clear');
const searchButton = document.getElementById('button__search');
const createButton = document.getElementById('create__button')
const sneakList = [];

const sneakHTMLTemplate = ({
    material,
    color,
    descriptionText,
    price
}) => `
<div class="main__item">
  <div class="item__image"><img src="img/sneaker.jpg" alt=""></div>
  <h3 class="item__title">Sneaker</h3> 
  <p class="item__property">material: ${material}</p>
  <p class="item__property">Color: ${color}</p>
  <p class="item__property">descriptionText: ${descriptionText} m</p>
  <p class="item__price">Price: ${formatMoney(price)}</p>
  <div class="item__buttons">
    <button class="button item__buttons-delete">Delete</button>
  </div>
</div>
`;

const addSneakers = ({ material, color, descriptionText, price }) => {
    var sneakerContainer = document.getElementById('items_container');
    sneakerContainer.insertAdjacentHTML('beforeend', sneakHTMLTemplate({
        material,
        color,
        descriptionText,
        price
    }));
};

function updateDOM(givenList) {
    var elements = itemsContainer.querySelectorAll('.items_container');
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    for (var i = 0; i < givenList.length; i++) {
        var material = givenList.material;
        var color = givenList[i].color;
        var descriptionText = givenList[i].descriptionText;
        var price = givenList[i].price;
        addSneakers({ material, color, descriptionText, price });
    }
};
sortCheckbox.addEventListener('click', (event) => {
    event.preventDefault();
    sortCheckbox.classList.toggle('active');
    document.getElementById('button-sort__circle').classList.toggle('active');
    sneakList.sort((o1, o2) => o2.price - o1.price);
    updateDOM(sneakList);
});


countBtn.addEventListener('click', (event) => {
    event.preventDefault();
    var totalPrice = sneakList.reduce((counter, item) => (counter += item.price), 0);
    document.getElementById('count_total').innerText = totalPrice + '$';
});
createButton.addEventListener('click', (event) => {
    event.preventDefault();
    var material = `leather`;
    var color = `red`;
    var descriptionText = '5+';
    var price = Math.floor(Math.random() * 10);
    var sneak = new Sneakers(material, color, descriptionText, price);
    sneakList.push(sneak);
    addSneakers({ material, color, descriptionText, price });
    sortCheckbox.classList.remove('active');
    document.getElementById('sort').classList.remove('active');
});
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    var text = document.getElementById("search_input").value;
    var pattern = new RegExp(text);
    var filteredList = sneakList.filter(sneak => pattern.test(sneak.color));
    updateDOM(filteredList);
});

clearButton.addEventListener('click', (event) => {
    updateDOM(sneakList);
});