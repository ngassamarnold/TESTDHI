import { combineReducers } from 'redux';
import { products, cartProducts } from '../providers/data';

const initialState = {
    products,
    cartProducts
};

const productReducer = (state = initialState.products, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

const cartReducer = (state = initialState.cartProducts, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            var exist = false;
            state.forEach((product, index) => {
                if (product.name == action.payload.name) {
                    exist = true;
                    product.quantity++;
                }
            })
            if (!exist) {
                state.push({ name: action.payload.name, price: action.payload.price, quantity: 1 });
            }
            return [...state];
        }
        case 'REMOVE_PRODUCT': {
            state.forEach((product, index) => {
                if (product.name == action.payload.name) {
                    product.quantity--;
                    if (product.quantity == 0) {
                        state.splice(index, 1);
                    }
                }
            })
            return [...state];
        }
    }
    return state;
}

export default combineReducers({
    productsReducers: productReducer,
    cartReducers: cartReducer,
});
