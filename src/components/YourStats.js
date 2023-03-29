import React from "react";

export default function YourStats(props) {

    return (

      // This part is hardcoded since we haven't enable form submission
      <div className="col text-center">
        <h2> Your Stats </h2>
        <p>Height: {props.yourStats["height"]} inches</p>
        <p>Weight: {props.yourStats["weight"]} lbs</p>
        <p>Wingspan: {props.yourStats["wingspan"]} inches</p>
        <p>Hand Size: {props.yourStats["handsize"]} inches</p>
        <p>Arm Length: {props.yourStats["arm_length"]} inches</p>
        <p>Vertical Jump: {props.yourStats["vertical_jump"]} inches</p>
        <p>Broad Jump: {props.yourStats["broad_jump"]} inches</p>
        <p>40 yard dash: {props.yourStats["40_yard_dash"]} sec</p>
      </div>
    )
}