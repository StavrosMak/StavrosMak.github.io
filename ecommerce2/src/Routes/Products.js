
import ProductList from "../components/Product/ProductList"
import React, { useState } from 'react';
import { motion } from 'framer-motion'

export default function Products() {

    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    return (
        <motion.div className="productPageContainer" style={{ minHeight: '100vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
        >
            <ProductList toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        </motion.div>
    );
}

