import React from "react";

import { Link } from "react-router-dom";

export default function Homepage(props) {

  return (
    <div className="bg-pic homepage">
      <div className="container d-flex justify-content-center">
        <section className="container bg-black bg-opacity-75 d-flex flex-column rounded-2 align-middle homepage-card">
            <button type="button" className="btn btn-light btn-lg align-self-center">
            <Link className="text-black" to="/compare">Begin Your NFL Journey Today</Link>
            </button>
            <p className="align-self-center text-white">OR</p>
            <button type="button" className="btn btn-light btn-lg align-self-center">
            <Link className="text-black" to="/position-select">View NFL Players</Link>
            </button>
        </section>
      </div>
    </div>    
  );
}