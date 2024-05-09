import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartitems: [],
  totalprice: 0,
  updateTotal: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action) => {


      let product = state.cartitems.find(item => { return item.id === action.payload.id })
      let Logindata = JSON.parse(localStorage.getItem('loginUser'))

      if (Logindata) {

        if (!product) {
          state.cartitems.push({ ...action.payload, quantity: 1 })
          const cartTotalPrice = state.cartitems.reduce((itemsTotal, item) => {

            let price = item.price * item.quantity

            return itemsTotal += price
          }, 0)

          state.totalprice = cartTotalPrice
        } else {
          alert('this product was already in cart')
        }
      } else {
        alert('please login before adding the product to cart')
      }




    },
    RemoveCart: (state, action) => {
      state.cartitems.splice(action.payload, 1)

      const cartTotalPrice = state.cartitems.reduce((itemsTotal, item) => {

        let price = item.price * item.quantity

        return itemsTotal += price
      }, 0)
      state.totalprice = cartTotalPrice

    },

    increment: (state, action) => {

      let product = state.cartitems.find(item => item.id === action.payload.id)


      if (product) {

        product.quantity += 1
      }

      // let productIndex = state.cartitems.findIndex(item => item.id === action.payload.id);

      // if (productIndex !== -1) {
      //   let updatedPayload = { ...action.payload };
      //   updatedPayload.quantity += 1
      //   state.cartitems[productIndex] = updatedPayload;
      // }

      const cartTotalPrice = state.cartitems.reduce((itemsTotal, item) => {
        let price = item.price * item.quantity
        return itemsTotal += price
      }, 0)
      state.totalprice = cartTotalPrice
    },

    decrement: (state, action) => {

      let product = state.cartitems.find(item => item.id === action.payload.id)



      if (product.quantity > 0) {
        product.quantity -= 1
      }

      // let productIndex = state.cartitems.findIndex(item => item.id === action.payload.id);

      // if (productIndex !== -1) {

      //   let updatedPayload = { ...action.payload };

      //   if (updatedPayload.quantity > 0) {
      //     updatedPayload.quantity -= 1
      //     state.cartitems[productIndex] = updatedPayload; 
      //   }else if(updatedPayload.quantity === 1 ){
      //     state.cartitems.splice(productIndex, 1)
      //   }
      // }

      const cartTotalPrice = state.cartitems.reduce((itemsTotal, item) => {
        let price = item.price * item.quantity
        return itemsTotal += price
      }, 0)
      state.totalprice = cartTotalPrice


    },

  },

  updatetotal: (state) => {

    const cartTotalPrice = state.cartitems.reduce((itemsTotal, item) => {

      let price = item.price * item.quantity

      return itemsTotal += price
    }, 0)

    state.cart.totalprice = cartTotalPrice

  }
})


export const { AddToCart, RemoveCart, increment, decrement, updateTotal } = cartSlice.actions

export default cartSlice.reducer