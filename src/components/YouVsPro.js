import React from "react";
import YourStats from "./YourStats";
import ProStats from "./ProStats";

export default function YouVsPro(props) {

  const chosenFilters = Object.keys(props.yourFilter).filter(key => {
    if (props.yourFilter[key]) {
      return key;
    }
  })

  const filteredPlayerArray = props.players_data.filter(player => {
    if (chosenFilters.includes(player.Pos)) {
      return player;
    }
  })

  // Fake match as a random output
  // const playerInd = Math.floor(Math.random() * filteredPlayerArray.length);

  // Real Match as a calculated output
  function findThreeSimilar(stats) {
    let first;
    let second;
    let third;
    let current;
    let firstScore = Infinity;
    let secondScore = Infinity;
    let thirdScore = Infinity;
    let currentScore = 0;
    for (let i = 0; i < filteredPlayerArray.length; i++) {
        current = filteredPlayerArray[i];
        currentScore = 0;
        Object.keys(current.measurables).forEach(element => {
          if (stats[element] !== undefined && current.measurables[element] !== undefined) {
            currentScore += Math.abs(stats[element] - current.measurables[element]);
          }
        });
        if (currentScore === 0) {
            // skip because it's the same player
        } else if (currentScore < firstScore) {
            first = current;
            firstScore = currentScore;
        } else if (currentScore < secondScore) {
            second = current;
            secondScore = currentScore;
        } else if (currentScore < thirdScore) {
            third = current;
            thirdScore = currentScore;
        }
    }
    return ([first, second, third]);
  }

  const threeSim = findThreeSimilar(props.yourStats);

  return (
    <div>
      <div className="page_title">
        <h1>You vs. Pro</h1>
      </div>
      <div className="container pro_match pt-3">
        <div className="col">
          <YourStats yourStats={props.yourStats} />
          <ProStats setPlayerCallback={props.setPlayerCallback} threeSim={threeSim}/>
        </div>
      </div>
    </div>
  );
}