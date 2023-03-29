import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import {getDatabase, ref as dRef, onValue, set as firebaseSet, push as firebasePush} from 'firebase/database';
import ProRadar from "./ProRadar";

export default function PlayerDetails(props) {

    const [errorMessage, setErrorMessage] = useState(null);
    const urlParams = useParams();
    const playerName = urlParams.playerName;
    let playerData = props.allPlayers.filter((player) => {
        return player.Player === playerName;
    })
    const db = getDatabase();
    const tagRef = dRef(db, "usertags/" + props.currentUser.userId);
    let taggedPeople;
    onValue(tagRef, (snapshot) => {
        taggedPeople = snapshot.val();
    })

    // only happens when refreshing page, temporarily set playerData to a placeholder while react
    // re renders everything
    if(playerData[0] === undefined) {
        playerData = [{
            "AV": 1,
            "Pfr_ID": "BarnRa20",
            "Pick": 225,
            "Player": "Loading Player",
            "Pos": "Loading",
            "img": "img/null.png",
            "measurables": {
              "40_yard_dash": 1,
              "benchreps": 10,
              "broad_jump": 100,
              "cone": 5,
              "height": 50,
              "shuttle": 4,
              "vertical_jump": 35,
              "weight": 200
            }
          }];
    }

    // Tag Pro Function
    const [isTagged, setIsTagged] = useState(false);
    function isThisPlayerTagged() {
        let containsTag = false;
        if(taggedPeople !== undefined && taggedPeople !== null) {
            for(const people of Object.keys(taggedPeople)) {
                if(taggedPeople[people].Pfr_ID === playerData[0].Pfr_ID) {
                    containsTag = true;
                }
            }
        }
        return containsTag;
    }
    // when it loads
    let bClass = 'bmN';
    if(props.currentUser.userId == null){
        bClass = "d-none";
    }
    if (isThisPlayerTagged()) {
        bClass = '';
    }

   
    function handleTag(event) {
        setIsTagged(isThisPlayerTagged());
        updateTag();
        if (!isTagged) {
            bClass = 'bmN';
        }
    }

    function updateTag() {
        if(!isThisPlayerTagged()) {
            firebasePush(tagRef, playerData[0])
                .then(() => {
                    setIsTagged(!isTagged);
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
        } else {
            let refURL;
            for(const people of Object.keys(taggedPeople)) {
                if(taggedPeople[people].Pfr_ID === playerData[0].Pfr_ID) {
                    refURL = people;
                    break;
                }
            }
            const removeTagRef = dRef(db, "usertags/" + props.currentUser.userId + "/" + refURL);
            firebaseSet(removeTagRef, null)
                .then(() => {
                    setIsTagged(!isTagged);
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
        }
    }

    function replaceUnderscore(string) {
        let replaced = string;
        replaced = replaced.split('_').join(' ');
        return replaced;
    }

    function uppercase(string) {
        const strToArr = string.split(' ');
        const allFirstToUC = strToArr.map(word => word[0].toUpperCase() + word.substring(1));  
        return allFirstToUC.join(' ');
    }

    function similarity(player) {
        let first;
        let second;
        let third;
        let current;
        let firstScore = Infinity;
        let secondScore = Infinity;
        let thirdScore = Infinity;
        let currentScore = 0;
        for (let i = 0; i < props.allPlayers.length; i++) {
            current = props.allPlayers[i];
            currentScore = 0;
            Object.keys(player.measurables).forEach(element => {
                currentScore += Math.abs(player.measurables[element] - current.measurables[element]);
            });
            if (currentScore == 0) {
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

        // only happens when refreshing, make placeholder cards to wait for react rendering
        if(first === undefined && second === undefined) {
            return(makeThreeCards([playerData, playerData, playerData]))
        }
        return (makeThreeCards([first, second, third]));
    }

    function makeThreeCards(threeSim) {
        let index = 0;
        const cardArray = threeSim.map((player) => {
            index++;
            return (
                <div className="mb-4 col-sm-12 col-md-3 d-flex card-box" key={index}>
                    <Link className="card_link" to={"/ranking/" + player.Player}>
                        <div className="card">
                            <div className="card-body p-2">
                                <div className="row">
                                    <div className="col-12 sim-img-card">
                                        <img className="img-fluid rounded-top pb-3 sim-player-img" src={"/" + player.img} alt={player.Player} />
                                    </div>
                                    <div className="col-12">
                                        <h2 className="card-title sim_player_name">{player.Player}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        })
        
        return (
            <div className="px-5 col-12">
                <div className="row justify-content-center">
                    {cardArray}
                </div>
            </div>
        );
    }

    function prepMeasureKey(string) {
        return uppercase(replaceUnderscore(string));
    }

    function checks(measurable, measurement) {
        if (measurable === "height" || measurable === "broad_jump") {
            let feet = Math.floor(measurement / 12);
            let inches = measurement % 12;
            return (feet + "' " + inches + "\"");
        } else if (measurable === "weight") {
            return measurement + " lbs";
        } else if ( measurable === "40_yard_dash") {
            return measurement + " secs";
        }
        return (measurement + "\"");
    }

    const pArray = Object.keys(playerData[0].measurables).map((measurablesKey) => {
        return <p key={measurablesKey}>{prepMeasureKey(measurablesKey)}: {checks(measurablesKey, playerData[0].measurables[measurablesKey])}</p>;
    });
    
    return (
        <div className="container player-details">
            <div className="container text-center pt-3">
                {errorMessage &&
                    <Alert variant="danger" dismissible onClose={() => setErrorMessage(null)}>{errorMessage}</Alert>
                }
                <div className="row">
                    <div className="col-sm-12 col-lg-4">
                        <div className="pt-3 pb-1 display-4 player_heading container d-flex justify-content-center">
                        <h1>{playerData[0].Player}</h1>
                            <span className={"material-symbols-outlined " + bClass} onClick={handleTag}>
                                bookmark
                            </span>
                        </div>
                        <p className="text-muted">{playerData[0].Team}, {playerData[0].Pos}</p>
                        <img className="rounded-circle py-3 img-fluid player-img" src={"/" + playerData[0].img} alt={playerData[0].Player} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 align-self-center">
                        <h2 className="pt-5 pb-2">Measurables:</h2>
                        {pArray}
                    </div>
                    <div className="col-sm-auto col-md-6 col-lg-4 align-self-center">
                        <h2 className="pt-5">Graph:</h2>
                        <ProRadar data={playerData[0].measurables}/>
                    </div>
                    
                    <div className="col-12">
                        <h2 className="display-5 sim_players">Similar Players</h2>
                    </div>
                    {similarity(playerData[0])}
                </div>
            </div>
        </div>
    );
}