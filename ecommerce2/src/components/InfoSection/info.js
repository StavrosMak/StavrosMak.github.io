

import React from "react";


import data from "../data/infoCards.json";
import InfoCard from "./infoCard";
import "./info.css"

export default function Info() {

    return (
        <section className="infoSection">
            <section className="infoSection">
                {data.cards.map((card, index) => (
                    <InfoCard key={index}
                        icon={card.icon}  
                        title={card.title}
                        description={card.description} />
                ))}
            </section>


        </section>

    )




}