import React, { createContext, useContext, useEffect, useState  } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    // State variables for products and categories
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     // Function to create a new category
     const createCategory = async (newCategory) => {
        try {
            const token = localStorage.getItem('jwt'); // Ensure admin is authenticated
            const response = await axios.post('http://localhost:3000/categories', newCategory, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setCategories((prevCategories) => [...prevCategories, response.data]); // Update state
            return { success: true, message: 'Category created successfully!' };
        } catch (error) {
            return { success: false, message: error.response?.data?.errors?.join(', ') || 'Failed to create category' };
        }
    };


    // Fetch products and categories from the API
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setLoading(true);
            setError(null);

            try {
                const productResponse = await axios.get('http://localhost:3000/products');
                const categoryResponse = await axios.get('http://localhost:3000/categories');
                
                setProducts(productResponse.data);
                setCategories(categoryResponse.data);
            } catch (err) {
                setError('Failed to fetch data from the API.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);
    

    // Compute derived data
    const TopOffers = products.filter(product => product.discount > 20);
    const TopPrice = products.reduce((prev, current) => (prev.price > current.price ? prev : current), {});
    const ElectronicsProducts = products.filter(product => product.category?.title === 'Electronics');
    const ClothingProducts = products.filter(product => product.category?.title === 'Clothing');
    const BeautyProducts = products.filter(product => product.category?.title === 'Beauty');
    const ExpensiveProducts = products.filter(product => product.price > 100);
    const AffordableProducts = products.filter(product => product.price < 60);

    return (
        <ProductContext.Provider
            value={{
                AllProducts: products,
                AllCategories: categories,
                TopOffers,
                TopPrice,
                ElectronicsProducts,
                ClothingProducts,
                BeautyProducts,
                ExpensiveProducts,
                AffordableProducts,
                loading,
                error,
                createCategory
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};

