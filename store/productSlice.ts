// store/slices/exampleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IcartItem {
  id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  quantity: number;
}

export interface IFavoritesItem {
  id: string;
  title: string;
  price: number;
  stock: number;
  isNew: boolean;
  discount: number;
  mainImage: string;
  images: [];
}

interface IinitialState {
  cart: IcartItem[];
  favorites: IFavoritesItem[];
}

const initialState: IinitialState = {
  cart: [],
  favorites: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IcartItem>) => {
      state.cart.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },

    emptyCart: (state) => {
      state.cart = [];
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity < product.stock) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    addToFavorites: (state, action: PayloadAction<IFavoritesItem>) => {
      state.favorites.push(action.payload);
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavorites,
  removeFromFavorites,
} = productSlice.actions;

export default productSlice.reducer;
