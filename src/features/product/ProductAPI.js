export function fetchAllProductsCount(){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        resolve(data.length);
    })
}

// To fetch a single product by specific id
export function fetchProductById(id){
    return new Promise(async (resolve)=>{
        const response = await fetch(`http://localhost:3000/products?id=${+id}`);
        const data = await response.json();
        resolve(data[0]);
    })
}

// To create a single product by admin
export function createProduct(product){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/products',{
            method: 'POST',
            body: JSON.stringify(product),
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json();
        resolve(data);
    })
}

// update product
export function updateProduct(update){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/products/'+update.id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {'content-type': 'application/json'}
        });
        const data = await response.json()
        resolve(data);
    })
}

export function fetchProductsByFilters(filter, sort, pagination){
    // filter = {"category":["smartphone", laptops]}
    // sort = {_sort: 'price', _order: 'desc'}
    // pagination = {_page: 1, limit:10}
    // console.log('from APi function sortObj', sort);

    // TODO: on server we will support multi values

    let queryString = '';

    // Filter
    for(let key in filter){
        const categoryValues = filter[key];     // output ["smartphone", "laptops"]
        if (categoryValues.length) {
            const lastCategoryValue = categoryValues[categoryValues.length-1];
            queryString+=`${key}=${lastCategoryValue}&`;
        }
    }

    // Sort
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }

    // Pagination
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
    }

    return new Promise(async (resolve)=>{
        const response = await fetch(`http://localhost:3000/products?${queryString}`);
        const data = await response.json();
        resolve({data});
    })
}


export function fetchBrands(){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/brands');
        const data = await response.json();
        resolve(data);
    })
}


export function fetchCategories(){
    return new Promise(async (resolve)=>{
        const response = await fetch('http://localhost:3000/categories');
        const data = await response.json();
        resolve(data);
    })
}