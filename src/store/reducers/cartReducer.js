import { updateObject } from 'utils/helperFunctions';
import * as actionTypes from 'store/constants';

const initialState = {
    items: [],
    count: 0,
    restaurant: undefined,
    totalPrice: 0
}


const addItem = (state, action) => {
    const newItems = state.items

    newItems.push(action.item)
    const newPrice = state.totalPrice + action.item.price
    return updateObject(state, {
        items: newItems,
        count: state.count + 1,
        totalPrice: newPrice
    });
}

const deleteItem = (state, action) => {
    const item = state.items[action.id]//state.items.find(oneItem => oneItem._id === action.id)
    let { count, totalPrice } = state;
    if (item) {
        count -= 1;
        totalPrice -= item.price
    }
    const newItems = state.items;
    newItems.splice(action.id, 1)//state.items.filter(singleItem => singleItem._id !== action.id)
    return updateObject(state, {
        items: newItems,
        count,
        totalPrice
    })
}

const resetCart = (state, action) => {

    return updateObject(state, {
        items: [],
        count: 0,
        restaurant: undefined,
        totalPrice: 0
    })
}

const setRestaurant = (state, action) => {
    console.log(action)
    return updateObject(state, {
        restaurant: action.restaurant
    })
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM: return addItem(state, action);
        case actionTypes.CART_DELETE_ITEM: return deleteItem(state, action);
        case actionTypes.CART_RESET: return resetCart(state, action);
        case actionTypes.CART_RESTAURANT: return setRestaurant(state, action);

        default:
            return state;
    }
}

export default cartReducer;
