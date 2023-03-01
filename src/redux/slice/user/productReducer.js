import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAdminProductApi, getAdminSelectedProductApi } from '../../../utils/api';




const  initialState = {
  product: [],
  isLoading : false,
}


export const getProduct = createAsyncThunk("product/getProduct", async(q) => {

  const { category, search} = q
    try {
      if(search || category){
      
        return fetch(`${getAdminSelectedProductApi}/?category=${category}&search=${search}`)
        .then((resp) => resp.json())
        
      }else{
        return fetch(getAdminProductApi)
        .then((resp) => resp.json())
      }
    } catch (error) {
      console.log(error);
    }
       
    });

const productReducer = createSlice({
    name : 'product',
    initialState,
    reducers: {
        product : (state,action)=>{
          getProduct()


        }
    },
    extraReducers(builder) {
        builder
          .addCase(getProduct.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.product = action.payload.data;
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
          })
      },
})

export const { product } = productReducer.actions
export default productReducer.reducer