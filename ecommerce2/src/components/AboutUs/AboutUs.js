
import './AboutUs.css'
import logo from '../../Images/logo.png'
// import logo from '../images/logo.png'
export default function AboutUs() {
    return (
        <section className="AboutUs" id='/about'>
            <h2>About us</h2>
            <div className='AboutUsContent'>
                <img src={logo} alt='logo' />
                <p>At Unique, we started with a simple idea:
                    to bring fashion enthusiasts like you a truly unique shopping experience.
                    Our journey began with a group of passionate individuals who shared a love
                    for fashion and a desire to offer something different. We set out to create
                    a brand that would showcase the latest styles and trends, while also staying
                    true to our values of sustainability and ethical sourcing.
                    Today, we're proud to say that we've achieved that and more.
                    Our collection features a carefully curated selection of high-quality
                    products that are both stylish and affordable, and our commitment to
                    sustainability and ethical practices remains at the core of everything
                    we do. We're dedicated to providing exceptional customer service and
                    making a positive impact on the world around us. So if you're
                    looking for a fashion brand that's truly unique, look no further than Unique.</p>
            </div>
        </section>
    )
}


