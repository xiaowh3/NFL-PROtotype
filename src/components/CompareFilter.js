import React from "react";

import { Link } from "react-router-dom";

export default function CompareFilter(props) {

  const handleChangeQB = () => {
    props.setYourFilter({...props.yourFilter, 'Quarterback': !props.yourFilter['Quarterback']});
  }
  const handleChangeWR = () => {
    props.setYourFilter({...props.yourFilter, 'Wide Receiver': !props.yourFilter['Wide Receiver']});
  }
  const handleChangeRB = () => {
    props.setYourFilter({...props.yourFilter, 'Running Back': !props.yourFilter['Running Back']});
  }
  const handleChangeOL = () => {
    props.setYourFilter({...props.yourFilter, 'Center': !props.yourFilter['Center']});
  }
  const handleChangeLB = () => {
    props.setYourFilter({...props.yourFilter, 'Linebacker': !props.yourFilter['Linebacker']});
  }
  const handleChangeCB = () => {
    props.setYourFilter({...props.yourFilter, 'Cornerback': !props.yourFilter['Cornerback']});
  }
  const handleChangeS = () => {
    props.setYourFilter({...props.yourFilter, 'Safety': !props.yourFilter['Safety']});
  }
  const handleChangeDL = () => {
    props.setYourFilter({...props.yourFilter, 'Defensive Tackle': !props.yourFilter['Defensive Tackle']});
  }

  return (
    <div className="col-md-4 col-sm-8 p-5">
      <h2>Compare to:</h2>
      <div className="position-checkbox">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="qb" onChange={handleChangeQB} checked={props.yourFilter['Quarterback']}/>
          <label className="form-check-label">
            Quarterback
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wr" onChange={handleChangeWR} checked={props.yourFilter['Wide Receiver']}/>
          <label className="form-check-label">
            Wide Receiver
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="rb" onChange={handleChangeRB} checked={props.yourFilter['Running Back']}/>
          <label className="form-check-label">
            Running Back
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ol" onChange={handleChangeOL} checked={props.yourFilter['Center']}/>
          <label className="form-check-label">
            Center
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="lb" onChange={handleChangeLB} checked={props.yourFilter['Linebacker']}/>
          <label className="form-check-label">
            Linebacker
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="cb" onChange={handleChangeCB} checked={props.yourFilter['Cornerback']}/>
          <label className="form-check-label">
            Cornerback
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="s" onChange={handleChangeS} checked={props.yourFilter['Safety']}/>
          <label className="form-check-label">
            Safety
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="dl" onChange={handleChangeDL} checked={props.yourFilter['Defensive Line']}/>
          <label className="form-check-label">
            Defensive Tackle
          </label>
        </div>
      </div>
      <Link to="/comparison" className="next btn btn-primary my-2">Submit</Link>
    </div>
  );
}