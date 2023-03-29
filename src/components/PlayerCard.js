import React from "react";

import { Link } from "react-router-dom";

export default function PlayerCard(props) {
    const player = props.player;

    function handleCardClick(event) {
        props.selectPlayerCallback(player);
    }

    return (
        <Link className="card_link" to={"/ranking/" + player.Player}>
        <div key={player.Player} className="rank_card" onClick={handleCardClick}>
            <img src={player.img} alt={player.Player}/>
            <div className="card_content">
                <h2>{props.cardNumber + ". " + player.Player}</h2>
                <div className="stats d-flex">
                <div className="card_stats">
                    <h3> Basic Stats: </h3>
                    <ul>
                        <li>Cone: {player.measurables.cone}s</li>
                        <li>Height: {player.measurables.height}"</li>
                        <li>Weight: {player.measurables.weight}lbs</li>
                    </ul>
                </div>
                <div className="extra_stats">
                    <h3> Extra Stats: </h3>
                    <ul>
                        <li>40 Yard Dash: {player.measurables["40_yard_dash"]}s</li>
                        <li>Vertical Jump: {player.measurables.vertical_jump}"</li>
                        <li>Broad Jump: {player.measurables.broad_jump}"</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </Link>
    )
}