import React from "react";

export default function CompareInput(props) {

  const handleChangeHeight = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "height": newValue});
  }
  const handleChangeWeight = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "weight": newValue});
  }
  const handleChangeWingspan = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "wingspan": newValue});
  }
  const handleChangeHandsize = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "handsize": newValue});
  }
  const handleChangeArmlength = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "arm_length": newValue});
  }
  const handleChangeVertical = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "vertical_jump": newValue});
  }
  const handleChangeBroad = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "broad_jump": newValue});
  }
  const handleChangeFourty = (event) => {
    let newValue = event.target.value
    props.setYourStats({...props.yourStats, "40_yard_dash": newValue});
  }

  return (
    <div className="col-md-6 col-sm-8">
      <div className="mb-3">
        <label className="form-label" htmlFor="height">Height (in)</label>
        <input type="number" className="form-control" min="1" id="height" onChange={handleChangeHeight} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="weight">Weight (lb)</label>
        <input type="number" className="form-control" min="1" id="weight" onChange={handleChangeWeight} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="wingspan">Wingspan (in)</label>
        <input type="number" className="form-control" min="1" id="wingspan" onChange={handleChangeWingspan} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="handsize">Hand Size (in)</label>
        <input type="number" className="form-control" min="1" id="handsize" onChange={handleChangeHandsize} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="armlength">Arm Length (in)</label>
        <input type="number" className="form-control" min="1" id="armlength" onChange={handleChangeArmlength} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="verticaljump">Vertical Jump (in)</label>
        <input type="number" className="form-control" min="1" id="verticaljump" onChange={handleChangeVertical} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="broadjump">Broad Jump (in)</label>
        <input type="number" className="form-control" id="broadjump" onChange={handleChangeBroad} placeholder={"numbers only"}/>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="fourty">40 Yard Dash (sec)</label>
        <input type="number" className="form-control" id="fourty" onChange={handleChangeFourty} placeholder={"numbers only"}/>
      </div>
    </div>
  );
}