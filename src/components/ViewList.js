import React from "react";
import ProList from "./ProList";

export default function ViewList(props) {
    return (
        <div className="view_list">
            <div className="page_title">
                <h1>Your Pro List</h1>
            </div>
            <div className="container pro_match">
                <ProList setPlayerCallback={props.setPlayerCallback} currentUser={props.currentUser}/>
            </div>
        </div>
    )
}