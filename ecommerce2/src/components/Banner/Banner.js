

import { Link } from "react-router-dom"
import "./banner.css"
export default function Banner() {

    return (
        <section className="banner">
            <div className="banner-content">
                <h1>Shop now and enjoy up to 50% off on a wide range of products</h1>
                <p>Don't miss this opportunity to save big on your favorite items. Limited time offer.</p>
                <Link to="/products">
                    <button>Shop now!</button>
                </Link>
            </div>

        </section>
    )
}