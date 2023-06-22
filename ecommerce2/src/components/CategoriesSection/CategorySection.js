import React from 'react';
import { Link } from 'react-router-dom'
import categoryData from "../data/Categories_Info.json"
import './categoriesSection.css'
// import im from '../../Images/men_fashion3-min.jpg'

export default function CategorySection() {
    return (
        <section className="categorySection">
            <h2>Categories</h2>
            <div className="categoryContainer">
                {categoryData.categories.map(category => (
                    <div className='categoryCard' key={category.categoryID}>
                        <Link to={category.categoryUrl}>
                            <div className='categoryCardImage'>
                                <img src={category.categoryImage} alt='categoryImage' loading="lazy"/>
                            </div>
                            <div className='categoryTitle'>{category.CategoryTitle}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}