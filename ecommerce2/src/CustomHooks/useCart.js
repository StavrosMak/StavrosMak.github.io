import { useState, useEffect } from 'react';

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);
    const [cartLength, setCartLength] = useState(0);


    useEffect(() => { //!init
        const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(initialCart);
    }, []);



    useEffect(() => { //!setItem to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartLength(cart.reduce((total, item) => total + item.quantity, 0));

    }, [cart]);


    const handleAddToCart = (item) => { //!Add to cart 
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCart(cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };


    const toggleCart = () => { //! Toggle cart
        setCartVisible(!cartVisible);
    };


    const handleQuantityChange = (item, change) => { //! Handle Quantity
        const updatedCart = [...cart];
        const updatedItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
        const updatedItem = { ...updatedCart[updatedItemIndex] };
        updatedItem.quantity += change;
        updatedItem.quantity <= 0 ? updatedCart.splice(updatedItemIndex, 1) : (updatedCart[updatedItemIndex] = updatedItem);
        setCart(updatedCart);
        setCartLength(updatedCart.reduce((total, item) => total + item.quantity, 0));
    };


    return { handleAddToCart, handleQuantityChange, toggleCart, setCartLength, setCart, cart, cartLength, cartVisible, setCartVisible };
};

export default useCart;