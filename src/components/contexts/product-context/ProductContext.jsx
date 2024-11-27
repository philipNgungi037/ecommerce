import React, { createContext, useContext, useEffect, useState  } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
   
    const TopOffers = products.filter(product => product.discount > 20);
    const TopPrice = products.reduce((prev, current) => (prev.price > current.price ? prev : current));
    const ElectronicsProducts = products.filter(product => product.category.title === 'Electronics');
    const ClothingProducts = products.filter(product => product.category.title === 'Clothing');
    const BeautyProducts = products.filter(product => product.category.title === 'Beauty');
    const ExpensiveProducts = products.filter(product => product.price > 100);
    const AffordableProducts = products.filter(product => product.price < 60);

    return (
        <ProductContext.Provider value={{
            AllProducts,
            TopOffers,
            TopPrice,
            ElectronicsProducts,
            ClothingProducts,
            BeautyProducts,
            ExpensiveProducts,
            AffordableProducts,
            AllCategories
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
