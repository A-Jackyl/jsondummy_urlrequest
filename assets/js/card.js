// Globals
const CardElement = document.getElementById('cardTemplate')
const navElement = document.getElementById('nav');
let DataObjectArray = null


// Page load
FetchDataObjects()
FetchCategoryData()

function clearApp() {
    CardElement.innerHTML = ""
}

//MVC

//Model Code--------------------------------//

//Fetches API data for products
function FetchDataObjects() {
    fetch('https://dummyjson.com/products?limit=100')
    //console.log(result);
    .then((result) => {
        return result.json();
    })
    .then((json) => {
        ProductsReceived(json);
    });
}

//Fetches API data for categories
function FetchCategoryData() {
    
    fetch('https://dummyjson.com/products/categories')
    .then((result) => {
        //console.log(result);
        return result.json()
    })
    
    .then((json) => {
        ReceiveCategoryData(json)
    });
}

//Controller Code--------------------------------//

function ProductsReceived(ProductData) {

    DataObjectArray = ProductData.products
    
    //turns it into an array
    let FeaturedProducts = [];
    

    //pulls these specific products out of the array
    FeaturedProducts.push(DataObjectArray[4], DataObjectArray[10], DataObjectArray[24])

    CreateProductView(FeaturedProducts)
}

function ReceiveCategoryData(myCategories) {
    //console.log(myCategories);
    CreateNavBar(myCategories)
}

function NavCallBack(myCategory) {
    //when you click on a category button, it 
    //console.log(myCategory);
    
    if (myCategory == "all") {
        CreateProductView(DataObjectArray)
    } else {
        let mySelectedProducts = [];
        DataObjectArray.forEach(product => {
            if (myCategory == product.category) {
                //console.log(product);
                mySelectedProducts.push(product)
            }
        });
        console.log(DataObjectArray);
        CreateProductView(mySelectedProducts)
    }
}

// View code-------------------------------------//

function CreateNavBar(categoryArray) {
    //Starts the myHTML variable but ALSO adds an "All" button before the categories
    let myHTML = `<button onclick="NavCallBack('all')">All</button> `

    //For every category it creates a new button
    categoryArray.forEach(element => {
        //console.log(element)
        myHTML += `<button onclick="NavCallBack('${element}')">${element}</button> `
    });
    
    // Puts what's in the variable inside the html of the site
    navElement.innerHTML = myHTML
}

function CreateProductView(CardJS) {
    clearApp()

    CardJS.forEach (product => {
        //console.log(product);

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