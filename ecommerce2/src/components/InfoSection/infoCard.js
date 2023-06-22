export default function InfoCard(props) {

    return (
        <div className="infoCard">
            <div className="infoImg" >
                <img src={props.icon}alt="" />
            </div>

            <div className="infoTitle">
                <h2>{props.title}</h2>
            </div>

            <div className="infoDesc">
                <p>{props.description}</p>
            </div>
        </div>
    )
}
