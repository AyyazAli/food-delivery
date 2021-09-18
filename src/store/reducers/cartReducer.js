import { updateObject } from 'utils/helperFunctions';
import * as actionTypes from 'store/constants';

const initialState = {
    items: [],
    count: 0,
    restaurant: null,
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
    console.log(action.id)
    const item = state.items.find(oneItem => oneItem.id === action.id)
    let { count, totalPrice } = state;
    if (item) {
        count -= 1;
        totalPrice -= item.price
    }
    const newItems = state.items.filter(singleItem => singleItem.id !== action.id)
    return updateObject(state, {
        items: newItems,
        count,
        totalPrice
    })
}

const resetCart = (state, action) => {
    return updateObject(state, {
        ...initialState
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
