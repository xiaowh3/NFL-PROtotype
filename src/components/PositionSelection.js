import React from "react";

import { Link } from "react-router-dom";

export default function PositionSelection(props) {

    const offensivePosObj = { "Quarterback": "img/quarterback.jpeg", "Wide Receiver": "img/wide receiver.jpeg", "Running Back": "img/running back.jpeg", "Center": "img/center.jpeg" };
    const offensivePosNames = Object.keys(offensivePosObj);

    const offensivePosCardArray = offensivePosNames.map((name) => {
        return <PositionCard key={name} positionName={name} positionImg={offensivePosObj[name]}  selectPositionCallback={props.selectPositionCallback} />
    })

    const defensivePosObj = { "Linebacker": "img/linebacker.jpeg", "Cornerback": "img/cornerback.jpeg", "Safety": "img/safety.jpeg", "Defensive Tackle": "img/defensive lineman.jpeg" };
    const defensivePosNames = Object.keys(defensivePosObj);

    const defensivePosCardArray = defensivePosNames.map((name) => {
        return <PositionCard key={name} positionName={name} positionImg={defensivePosObj[name]} selectPositionCallback={props.selectPositionCallback} />
    })

    return (
        <div>
            <div className="page_title">
                <h1>Choose a Position to Explore</h1>
            </div>
            <div className="container d-flex justify-content-center position_selection text-center">
                <div className="row">
                    <h2 className="fw-bold">Offensive Positions</h2>
                    {offensivePosCardArray}
                    <h2 className="pt-5 fw-bold">Defensive Positions</h2>
                    {defensivePosCardArray}
                </div>
            </div>
        </div>
    )
}

function PositionCard(props) {

    const positionName = props.positionName;
    const positionImg = props.positionImg;

    function handlePositionClick(event) {
        props.selectPositionCallback(positionName);
    }

    return (
        <div className="col col-md-6 d-flex justify-content-center col-xl-3 text-center py-3">
            <div className="position_card">
                <div className="positions">
                    <img src={positionImg} alt={positionName} />
                    <h3>{positionName}</h3>
                </div>
                <button type="button" className="btn btn-outline-dark" onClick={handlePositionClick}>
                    <Link className="nav-link active" to="/ranking">Explore</Link>
                </button>
            </div>
        </div>
    );
}
