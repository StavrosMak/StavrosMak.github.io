import "./ContactContent.css"
import contactInfo from "../data/Contact_Info.json"

export default function ContactContent() {
    return (
        <div className="ContactContainer">
            <div className="ContactContent">
                <div className="contactInfo">
                    <h2 className="headerContactInfo">Contact info</h2>
                    {contactInfo.contactInfo.map((info,index) => (
                        <div key={index}>
                            <div className="infoItems">
                                <p>
                                    <i className={info.icon}></i> {info.value}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="social">
                        <button><i className="fa-brands fa-facebook"></i></button>
                        <button><i className="fa-brands fa-instagram"></i></button>
                        <button> <i className="fa-brands fa-twitter"></i></button>
                    </div>
                </div>
                <div className="contactForm">
                    <form>
                        <h3 className="contactUsHeader">Contact US</h3>

                        <label>Name:</label>
                        <input type="text" />

                        <label>Email:</label>
                        <input type="email" />

                        <label>Message:</label>
                        <textarea />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}