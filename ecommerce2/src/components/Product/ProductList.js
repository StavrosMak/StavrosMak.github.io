import { motion } from 'framer-motion';
import Sidebar from '../SideBar/Sidebar';
import ProductCard from './ProductCard';
import useAPI from '../../CustomHooks/useAPI'
import './ProductList.css';

 
export default function ProductList({ toggleSidebar, showSidebar }) {

  const {  handleCategoryChange, products, isLoading } = useAPI('https://fakestoreapi.com/products');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="productListContainer">
      <Sidebar onCategoryChange={handleCategoryChange} toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div className="productCardList">
        <div className='productListHeader'>
          <h2>Products</h2>
          <button className='filterButton' onClick={toggleSidebar}>Filter</button>
        </div>
        <motion.div layout className='productListContent'>
          {
            products && products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          }
        </motion.div>
      </div>
    </div>
  );
}
