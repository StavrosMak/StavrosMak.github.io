import { useState } from "react";
import { useQuery } from 'react-query';


// const useAPI = () => {
const useAPI = (url) => {


    const [selectedCategories, setSelectedCategories] = useState([]);


    const fetchProducts = async () => {
        const response = await fetch(url);
        // const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    };

    const handleCategoryChange = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    };

    const { data: products, isLoading } = useQuery('products', fetchProducts, {
        staleTime: 1000 * 60 * 10
    });



    const filteredProducts = selectedCategories.length > 0 && products
        ? products.filter((product) => selectedCategories.includes(product.category))
        : products && products.filter((product) => ["men's clothing", "women's clothing", 'jewelery'].includes(product.category));


    return {

        handleCategoryChange,
        products: filteredProducts,
        isLoading
    };
};

export default useAPI;