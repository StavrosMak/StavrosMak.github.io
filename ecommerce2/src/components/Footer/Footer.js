import './Footer.css'
import logo from '../../Images/logo2.png'
import { Link } from "react-router-dom"
import categoryData from "../data/Categories_Info.json"
import Social from '../data/Social_Info.json'
import ContactInfo from '../data/Contact_Info.json'

export default function Footer() {

    return (
        <footer>
            <div className="FooterContainer">
                <div className='brandInfo'>
                    <div className="brandHeader">
                        <img src={logo} alt="logoImg" />
                        <h2>Unique 2023</h2>
                    </div>
                    <div className="footerDesc">
                        <p>At Unique, we're passionate about fashion and helping our customers find their own unique style.
                            Our curated selection of clothing and accessories is designed to empower and inspire people of all ages and sizes. With a commitment to quality and affordability, we strive to provide an exceptional
                            shopping experience for our customers.
                        </p>
                    </div>
                </div>
                <div className='Footerlinks'>
                    <ul className='FooterItem'>
                        <li> <h3>Categories</h3> </li>
                        {categoryData.categories.map(category => (
                            <li key={category.categoryID}>
                                <Link to={category.categoryUrl}>{category.CategoryTitle}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className='FooterItem contactInfo'>

                        {ContactInfo.contactInfo.map((contactItem, index) => (
                            <p key={index}>
                                <i className={contactItem.icon}></i>
                                <span>{contactItem.value}</span>
                            </p>
                        ))}


                    </div>
                </div>

                <div className='FooterItem social'>
                    <div className='subscription'>
                        <h3>Newsletter Subscription</h3>
                        <div className='subscriptionField'>
                            <input type='email' aria-label="subscribeInput" /><button onClick={() => { alert("subscribed!") }}>Sub</button>
                        </div>
                    </div>

                    <div className='socialLinks'>
                        {Social.social.map((socialItem) => (
                            <div key={socialItem.id}>
                                <Link to={socialItem.link} title='Social' className="socialItem"><i className={socialItem.icon}></i></Link>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='copyRights'>Copyright © 2023 Example Company. All rights reserved.</div>
            </div>
        </footer>
    )
}
