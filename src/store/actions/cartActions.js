import * as actionTypes from 'store/constants';
import axios from 'axios';



export const resetCart = () => {
    return {type: actionTypes.CART_RESET}
}

export const deleteItemFromCart = (id) => {
    return { type: actionTypes.CART_DELETE_ITEM, id };
}

export const addItemToCart = (item) => {
    return { type: actionTypes.CART_ADD_ITEM, item };
}

export const cartRestaurant = (restaurant) => {
    return { type: actionTypes.CART_RESTAURANT, restaurant };
}