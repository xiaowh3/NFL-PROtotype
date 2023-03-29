import React, { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { Link } from "react-router-dom";
import {getDatabase, ref as dRef, onValue, set as firebaseSet, push as firebasePush} from 'firebase/database';

export default function ProList(props) {
  let taggedPeople;
  const db = getDatabase();
  const tagRef = dRef(db, "usertags/" + props.currentUser.userId);
  onValue(tagRef, (snapshot) => {
  taggedPeople = snapshot.val();
  })
  if (taggedPeople == undefined && taggedPeople == null) {
    return (
      <div className="container bg-black bg-opacity-75 d-flex flex-column rounded-2 w-50 text-white mt-5">
          <p className="pt-2 lead text-center">Uh oh! You haven't tagged any players yet. Go check them out on in our <Link className="text-white" to="/position-select">Ranking Page</Link> and tag any of them when you dive into details!</p>
      </div>
    )
  } else {

    function makeTaggedCards(taggedPeople) {

      let cardArray = [];
      let index = 1;
      for(const people of Object.keys(taggedPeople)) {
        // if(taggedPeople[people] != undefined) {
          cardArray.push(<PlayerCard key={index} player={taggedPeople[people]} cardNumber={index} selectPlayerCallback={props.setPlayerCallback} />);
        // }
        index++;
      }
      return cardArray;
    }

    const cardArray = makeTaggedCards(taggedPeople);

    return (
      <div className="col text-center">
          {cardArray}
      </div>
    )
  }
}