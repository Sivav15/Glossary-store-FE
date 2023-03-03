import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAdminProductApi, getAdminSelectedProductApi } from '../../../utils/api';




const  initialState = {
  product: [],
  isLoading : true,
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
            console.log("kkkkkkkkkkkkkkkkk");
            state.isLoading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
                  //  setTimeout(()=>{
                    state.product = action.payload.data;
                    state.isLoading = false;
                    
                  //  },4000)
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
          })
      },
})

export const { product } = productReducer.actions
export default productReducer.reducer