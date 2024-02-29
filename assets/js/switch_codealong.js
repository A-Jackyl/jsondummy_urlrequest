let myValue = 35

/* switch (myValue) {
    case 50:
        console.log("var er 50")
        break;
    case 75:
        console.log("var er 75")
        break;
    case 100:
        console.log("var er 100")
        break;

    default:
        console.log("default")
        break;
} */

//Array from dummyjson
let myCategories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ]

//Choose item from array
let myCategory = myCategories[0]

let myElectronics = []
let myCosmetics = []
let myVehicles = []
let myMisc = []

categorySorter(myCategories)

function categorySorter(categoriesToSort) {
    
    myCategories.forEach(category => {
    
        switch (category) {
            //if the chosen category is either laptops or lighting, electronics will come out of console
            case 'laptops':
            case 'lighting':
            case 'smartphones':
                //console.log('Electronics');
                myElectronics.push(category)
                break;
                
                case 'fragrances':
                    case 'skincare':
                //console.log('Cosm');
                myCosmetics.push(category)
                break;
                
                case 'motorcycle':
                    case 'automotive':
                //console.log('Veh');
                myVehicles.push(category)
                break;
                
                //otherwise it will come out as misc.
                default:
                //console.log('Misc');
                myMisc.push(category)
                break;
        }
    
    });
}
        
console.log(myElectronics);
console.log(myCosmetics);
console.log(myVehicles);
console.log(myMisc);