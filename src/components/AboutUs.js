import React from "react";

export default function AboutUs(props) {

  return (
    <div className="bg-pic about_us">
    <div className="container d-flex justify-content-center">
    <section className="container bg-black bg-opacity-75 d-flex flex-column rounded-2 align-middle">
        <h1 className="align-self-center text-white">About Us</h1>
        <p className="align-self-center text-white">
            As a group formed by students taking INFO 340 during the 22AU quater at UW, we identified a problem with how young aspiring athletes lack the means to know and understand where the barrier between an average player and a professional player lies. Being unable to determine this boundary can cause a lack of motivation due to the seemingly undefined gap between the player and a professional one. On the other hand, many fans aren't vying for a roster spot in the NFL, but using our webpage to compare themselves to their favorite professional players would still be entertaining at the very least.
        </p>
    </section>
    </div>
    </div>
  );
}