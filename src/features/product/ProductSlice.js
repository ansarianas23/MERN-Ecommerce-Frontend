import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createProduct, fetchAllProductsCount, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters, updateProduct } from "./ProductAPI";

const initialState = {
    products: [],
    selectedProduct: null,
    brands: [],
    categories: [],
    status: 'idle',
    totalItems: 0
}

export const fetchAllProductCountAsync = createAsyncThunk(
    'product/fetchAllProductsCount',
    async ()=>{
        const response  = await fetchAllProductsCount();
        return response;
    }
)

export const createProductAsync = createAsyncThunk(
    'product/createProduct',
    async (product)=>{
        const response  = await createProduct(product);
        return response;
    }
)

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id)=>{
        const response  = await fetchProductById(id);
        return response;
    }
)

export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({filter, sort, pagination, admin})=>{
        // console.log('from slice', sort);
        const response  = await fetchProductsByFilters(filter, sort, pagination, admin);
        return response.data;
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async ()=>{
        const response  = await fetchBrands();
        return response;
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async ()=>{
        const response  = await fetchCategories();
        return response;
    }
)

export const updateProductAsync = createAsyncThunk(
    'product/updateProduct',
    async (update)=>{
        const response  = await updateProduct(update);
        return response;
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        clearSelectedProduct: (state)=>{
            state.selectedProduct = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProductCountAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllProductCountAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.totalItems = action.payload;
        })
        .addCase(fetchProductsByFiltersAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.products = action.payload;
        })
        .addCase(fetchBrandsAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchBrandsAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.brands = action.payload;
        })
        .addCase(fetchCategoriesAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchCategoriesAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.categories = action.payload;
        })
        .addCase(fetchProductByIdAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.selectedProduct = action.payload;
        })
        .addCase(createProductAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(createProductAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.products.push(action.payload);
        })
        .addCase(updateProductAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(updateProductAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            const index =  state.products.findIndex(product=>product.id === action.payload.id);
            state.products[index] = action.payload;
            state.selectedProduct = action.payload;
        })
    }

})


export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state)=> state.product.products;
export const selectAllBrands = (state)=> state.product.brands;
export const selectAllCategories = (state)=> state.product.categories;
export const selectAllProductsTotalItems = (state)=> state.product.totalItems;
export const selectProduct = (state)=> state.product.selectedProduct;
export const selectProductStatus = (state)=> state.product.status;

export default productSlice.reducer;