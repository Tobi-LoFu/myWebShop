import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: [],
    }   ,
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                item => item.id === newItem.id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map(item =>
                        item._id === existItem._id ? newItem : item
                    )
                : [...state.cart.cartItems, newItem];
            return { ...state, cart: { cartItems } };
           
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: state.cart.cartItems.filter(
                        (item) => item.id !== action.payload
                    ),
                },
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [],
                },
            };
        default:
            return state;
    }
}

export function StoreProvider (props) {
    const [state, dispatch ] = useReducer(reducer, initialState);   // useReducer is a hook that allows us to use a reducer function to update the state of our application.
    const value = { state, dispatch };

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}
