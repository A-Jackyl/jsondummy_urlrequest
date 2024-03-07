// Globals
const CardElement = document.getElementById('cardTemplate')
const navElement = document.getElementById('nav');
const basketIcon = document.getElementById('shopping_cart');

let DataObjectArray = null

// Page load
InitApp()


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

function GetProductsByCategory(myCategoryURL) {
    fetch(myCategoryURL)
        .then((result) => {
            //console.log(result);
            return result.json()
        })
        .then((json) => {
            receivedProductsByCategory(json)
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

function SaveBasketData(basketData) {
    //create code to save data object to local storage

}

function ReadLocalStorageData() {

    // write code to read data object and return it
    return myBasket
}

//Controller Code--------------------------------//

function InitApp() {
    FetchDataObjects()
    FetchCategoryData()
}

function receivedProductsByCategory(productsByCat) {
    let myProductArray = productsByCat.products
    CreateProductView(myProductArray)
}

function ReceiveCategoryData(CategoryData) {
    // hoved kategori arrays
    let myElectronics = []
    let myCosmetics = []
    let myVehicles = []
    let womensFashion = []
    let mensFashion = []
    let myMisc = []

    CategoryData.forEach(category => {

        switch (category) {

            case 'laptops':
            case 'lighting':
            case 'smartphones':

                myElectronics.push(category)
                break;

            case 'fragrances':
            case 'skincare':
                myCosmetics.push(category)

                break;

            case 'automotive':
            case 'motorcycle':
                myVehicles.push(category)

                break;

            case 'tops':
            case 'womens-dresses':
            case 'womens-shoes':
            case 'womens-watches':
            case 'womens-bags':
            case 'womens-jewellery':

                womensFashion.push(category)

                break;

            case 'tops':
            case 'mens-shirts':
            case 'mens-shoes':
            case 'mens-watches':
                mensFashion.push(category)

                break;

            default:

                myMisc.push(category)
                break;
        }

    });

    // add all to misc
    myMisc.push('All')

    // build datastructure to view code
    let myNavigationData = [
        {
            superCategoryname: 'Electronics',
            subCategories: myElectronics
        },
        {
            superCategoryname: 'Cosmetics',
            subCategories: myCosmetics
        },
        {
            superCategoryname: 'Vehicles',
            subCategories: myVehicles
        },
        {
            superCategoryname: 'mens fashion',
            subCategories: mensFashion
        },
        {
            superCategoryname: 'womans fashion',
            subCategories: womensFashion
        },
        {
            superCategoryname: 'misc',
            subCategories: myMisc
        }
    ]
    CreateNavBar(myNavigationData)
}

function ProductsReceived(ProductData) {

    DataObjectArray = ProductData.products
    
    //turns it into an array
    let FeaturedProducts = [];
    

    //pulls these specific products out of the array
    FeaturedProducts.push(DataObjectArray[4], DataObjectArray[10], DataObjectArray[24])

    CreateProductView(FeaturedProducts)
}

/* function ReceiveCategoryData(myCategories) {
    //console.log(myCategories);
    CreateNavBar(myCategories)
} */

function NavCallback(CategoryName) {
    console.log(CategoryName);
    // get data from API  bug API url og send videre
    if (CategoryName == "All") {
        CreateProductView(DataObjectArray)
    }
    else {
        let myCategoryURL = `https://dummyjson.com/products/category/${CategoryName}`
        GetProductsByCategory(myCategoryURL)
    }
}

function ProductCallback(myId) {
    let myClickedProduct = null
    DataObjectArray.forEach(product => {

        if (product.id == myId) {
            myClickedProduct = product
        }
    }
    )

    if (myClickedProduct == null) {
        // ingen produkt
        alert('no product')
    }
    else {
        // produkt
        //console.log(myClickedProduct)
        clearApp();
        buildProduct(myClickedProduct)
    }
}

function LogoCallback() {
    GetProductData()
}

//-----BASKET------//
function InitializeBasket() {
    // write code to start basket

}

function AddToBasket(productId) {
    // write code to add to basket you get product id

}

function BasketIconCallback() {
    // write code to get products from local storage and send them on to BuildBasket as an array of product objects

}

function BasketRemove(id) {
    // write code to remove product id from basket data array

}

function paymentCallBack() {
    alert('weee i am getting paid');
}

function BasketClear() {
    // write code to clear all data in the basket

}

function getProduct(id) {
    let myProduct = false
    DataObjectArray.forEach(product => {
        if (id == product.id) {
            myProduct = product
        }
    });
    return myProduct
}


// View code-------------------------------------//

/* function CreateNavBar(categoryArray) {
    //Starts the myHTML variable but ALSO adds an "All" button before the categories
    let myHTML = `<button onclick="NavCallBack('all')">All</button> `

    //For every category it creates a new button
    categoryArray.forEach(element => {
        //console.log(element)
        myHTML += `<button onclick="NavCallBack('${element}')">${element}</button> `
    });
    
    // Puts what's in the variable inside the html of the site
    navElement.innerHTML = myHTML
} */

function CreateProductView(CardJS) {
    clearApp()

    CardJS.forEach (product => {
        //console.log(product);

        let myHTML = `
        <figure class="product_card_item" href="https://google.com">
            <h2>${product.title}</h2>
            <p class="card_item_cat">${product.category}</p>
            <img src="${product.images[1]}"></img>
            <p class="card_item_desc">${product.description}</p>
            <div class="card_bottom">
                <p class="card_item_price">$ ${product.price}<span style="font-size: 2rem;">.00</span></p>
                <svg class="bottom_btn" fill="#219EBC" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 330 330" xml:space="preserve">
           <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
               c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
               C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
               C255,161.018,253.42,157.202,250.606,154.389z"/>
           </svg>
            </div>
        </figure>
        `

        CardElement.innerHTML += myHTML
    })
}

function CreateNavBar(Categorydata) {
    navElement.innerHTML = ''
    Categorydata.forEach(superCatData => {
        // ul from category array
        let mySubCats = '<ul>'
        superCatData.subCategories.forEach(subCatName => {
            let myListElement = `<li><div class="navRollover"onClick="NavCallback('${subCatName}')">${subCatName}</div></li>`
            mySubCats += myListElement
        });
        mySubCats += '</ul>'

        //console.log(mySubCats);
        //console.log(superCat.superCategoryname);
        let myCatHTML = `<div class="navCategories"><h3>${superCatData.superCategoryname}</h3>
        ${mySubCats}
        </div>`
        navElement.innerHTML += myCatHTML
    });
}

function UpdateBasketIcon(items) {

    let myUpdateElement = document.getElementById('basketProductText')
    myUpdateElement.innerHTML = items
}

function buildProduct(product) {

    let myHTML = `<section class="productDetails"><figure><h2>${product.title}</h2>
  
    <img src="${product.images[0]}">
    <img src="${product.images[2]}">
    <img src="${product.images[3]}">
    <h3>PRIS: ${product.price}</h3>
    <p>${product.description}</p>
    <button onclick="AddToBasket(${product.id})" >add to basket</button>
    </figure></section>
    `
    productSection.innerHTML = myHTML
}

