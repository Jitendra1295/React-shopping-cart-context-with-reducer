import React, { createContext, useContext, useReducer } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducers, productReducer } from './Reducers';

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
    const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const createRandomProducts = () => {
        return {
            id: faker.string.uuid(), // Updated usage
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: `https://picsum.photos/150/150?random=${faker.datatype.number()}`, // Use Lorem Picsum for random images
            inStock: faker.number.int({ min: 0, max: 10 }),
            fastDelivery: faker.datatype.boolean(),
            ratings: getRandomArrayElement([1, 2, 3, 4, 5]),
        };
    };
    const products = Array.from({ length: 20 }, createRandomProducts);

    const [state, dispatch] = useReducer(cartReducers, {
        products: products,
        cart: [],
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    });


    console.log("products :", products);

    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    );
};


export const CartState = () => {
    return useContext(Cart)
}

export default Context;