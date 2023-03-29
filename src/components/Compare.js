import React from "react";
import CompareFilter from "./CompareFilter";
import CompareInput from "./CompareInput";

export default function Compare(props) {

  return (
    <div className="compare-page">
    <div className="page_title">
      <h1>Tell Us About Yourself</h1>
    </div>
    <form className="mt-3">
      <div className="row container-fluid d-flex justify-content-center">
        <CompareInput yourStats={props.yourStats} setYourStats={props.setYourStats} />
        <CompareFilter yourFilter={props.yourFilter} setYourFilter={props.setYourFilter}/>
      </div>
    </form>
    </div>
  );
}