import React from "react";
import PlayerCard from "./PlayerCard";

export default function ProStats(props) {

  if (props.threeSim[0] == undefined) {
    return (
      <div className="container d-flex col text-center">
      <section className="container bg-black bg-opacity-75 d-flex flex-column rounded-2 w-50 text-white">
          <p className="pt-2">Uh oh! There's no valid Matches to your stats. Make sure you selected at least one position and entered your stats.</p>
      </section>
      </div>
    )
  } else {

    function makeThreeCards(threeSim) {
      let cardArray = [];
      for(let i = 0; i < 3; i++) {
        if(threeSim[i] != undefined) {
          cardArray.push(<PlayerCard key={i} player={threeSim[i]} cardNumber={i + 1} selectPlayerCallback={props.setPlayerCallback} />);
        }
      }
      return cardArray;
    }

    const cardArray = makeThreeCards(props.threeSim);

    return (
      <div className="col text-center">
        <h2> Matches </h2>
          {cardArray}
      </div>
    )
  }
}