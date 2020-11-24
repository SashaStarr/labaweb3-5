export class Sneakers {
    constructor(id, header, descriptionText, price) {
        this.id = id;
        this.header = header;
        this.descriptionText = descriptionText;
        this.price = price;
    }
}

export const sneakerHTMLTemplate = ({
    id,
    header,
    descriptionText,
    price
}) => `
<div class="main__sneaker" id="${id}">
    <img src = 1.png>
    <span class="main__sneaker-header">${header}</span>
    <div class="main__sneaker-description-text">${descriptionText}</div>
    
    <div class="main__sneaker-price">
        <h3>Price:</h3>
        <h3>${price}$</h3>
    </div>
    <div class="main__sneaker-buttons-container">
        <a href = "edit.html?id=${id}" class="main__sneaker-edit-button">Edit</a>
        <button class="main__sneaker-remove-button" id = "remove-button-${id}">Remove</button>
    </div>
    
</div>
`

export const addSneakers = ({ id, header, descriptionText, price }, callback) => {
    let sneakersContainer = document.getElementById('main__container');
    sneakersContainer.insertAdjacentHTML('beforeend', sneakerHTMLTemplate({
        id,
        header,
        descriptionText,
        price
    }));
    document.getElementById("remove-button-" + id).addEventListener('click', async function() {
        await fetch("http://127.0.0.1:8000/sneaker/" + id, { method: 'DELETE' });
        await callback();
    })
};