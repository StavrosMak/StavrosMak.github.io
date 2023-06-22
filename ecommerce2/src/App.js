import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Route, Routes, useLocation } from "react-router-dom"
import Home from './Routes/Home';
import Products from './Routes/Products';
import About from './Routes/About';
import Cart from './components/Cart/Cart'
import React, { useEffect } from 'react'
import Contact from './Routes/Contact';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import useCart from './CustomHooks/useCart';
import CartContext from './Context/CartContext';


const queryClient = new QueryClient();

function App() {

  const cart = useCart(); //cart functionality 
  const location = useLocation();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider value={cart}>
          <Navbar />
          <Routes location={location} key={location.path}>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
          {cart.cartVisible && <Cart />}
          <Footer />
          <ReactQueryDevtools />
        </CartContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;