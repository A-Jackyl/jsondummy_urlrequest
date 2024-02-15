FetchDataObjects ()
const CardElement = document.getElementById('cardTemplate')


function FetchDataObjects() {
    fetch('https://dummyjson.com/products')
        .then((result) => {
            return result.json();
        })
        .then((json) => {
            ProductsReceived(json);
        })
}

let DataObjectArray

function ProductsReceived(ProductData) {

    const DataObjectArray = ProductData.products
    
    let FeaturedProducts = [];
    
    FeaturedProducts.push(DataObjectArray[4], DataObjectArray[10], DataObjectArray[24])

    CreateProductView(FeaturedProducts)
}

function CreateProductView(CardJS) {

    CardJS.forEach (product => {
        console.log(product);

        let myHTML = `
        <figure class="product_card_item" href="https://google.com">
            <h2>${product.title}</h2>
            <img src="${product.images[1]}"></img>
            <p class="card_item_desc">${product.description}</p>
            <div class="card_bottom">
                <p>Price: $${product.price}</p>
                <a class="bottom_btn" href="#">Buy</a>
            </div>
        </figure>
        `

        CardElement.innerHTML += myHTML
    })
}