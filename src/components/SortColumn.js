import React from "react";

export default function SortColumn(props) {

    function handleChange(event) {
        props.setSearchCallback(event.target.value);
    }

    function handleCheckChange(event) {
        props.setAscendingCallback(event.target.checked);
    }
    function handleMinHeightChange(event) {
        props.setMinHeightCallback(event.target.value);
    }
    function handleMaxHeightChange(event) {
        props.setMaxHeightCallback(event.target.value);
    }
    function handleMinWeightChange(event) {
        props.setMinWeightCallback(event.target.value);
    }
    function handleMaxWeightChange(event) {
        props.setMaxWeightCallback(event.target.value);
    }
    function handleClearClick(event) {
        props.setMinHeightCallback('');
        props.setMaxHeightCallback('');
        props.setMinWeightCallback('');
        props.setMaxWeightCallback('');
    }
    const measurables = ["40_yard_dash", "vertical_jump","benchreps", "broad_jump", "cone", "shuttle"];
    const buttonArray = measurables.map((measurable) => {
        return <SortButton key={measurable} measurable={measurable} sortCriteria={props.sortCriteria} setSortCallback={props.setSortCallback} />;
    })

    let sectionClasses = "sort_column";
    let filterClasses = "";
    let displayClass = "";
    if (props.showFilters) {
        sectionClasses = "sort_section row";
        filterClasses = "col-6 text-center";
        displayClass = " d-none";
    }

    return (
        <section className={sectionClasses}>
            <h2 className={displayClass + " mt-4"}>Search</h2>
            <div className={"search" + displayClass} value={props.search} onChange={handleChange}>
                <textarea placeholder="Search By Name" className="form-control"></textarea>
            </div>
            <p className="h2 text-center mt-4">Sort</p>
            <div className="ascend_sort text-center">
                <input className="form-check-input" type="checkbox" id="ascend_rank" name="sort_type"
                    checked={props.isAscending} onChange={handleCheckChange} /> Sort by Descending
            </div>
            <p className="h2 mt-4 text-center">Filters</p>
            <p className="text-center">Height (in)</p>
            <div className={"height_filter container d-flex justify-content-center text-center" + filterClasses}>
                <input className="form-control w-25" type="number" id="min_height" name="min_height" min="10" max="200" placeholder="Min" value={props.minHeight} onChange={handleMinHeightChange} />
                <span className="mt-2">~</span>
                <input className="form-control w-25" type="number" id="max_height" name="max_height" min="10" max="200" placeholder="Max" value={props.maxHeight} onChange={handleMaxHeightChange} />
            </div>
            <p className="text-center">Weight (lbs)</p>
            <div className={"weight_filter container d-flex justify-content-center text-center" + filterClasses}>
                <input className="form-control w-25" type="number" id="min_weight" name="min_weight" min="10" max="200" placeholder="Min" value={props.minWeight} onChange={handleMinWeightChange} />
                <span className="mt-2">~</span>
                <input className="form-control w-25" type="number" id="max_weight" name="max_weight" min="10" max="200" placeholder="Max" value={props.maxWeight} onChange={handleMaxWeightChange}/>
            </div>
            <div className="specific_sort text-center">
                <p className="h6 mt-1">Filter By:</p>
                {buttonArray}
            </div>
            <div className="text-center mt-1 mb-3">
                <button type="button" className="btn btn-primary clear_filter" onClick={handleClearClick}>Clear Filters</button>
            </div>
        </section>
    )

}

// Turn into an array of sort buttons, replace all '_' with ' '
function SortButton(props) {

    const measurable = props.measurable;
    let activeClass = "";
    let buttonName = measurable.split('_').join(' ');
    function handleClick(event) {
        if (props.sortCriteria === measurable) {
            activeClass = "";
            props.setSortCallback('');
        } else {
            props.setSortCallback(measurable);
        }
    }

    if (props.sortCriteria === measurable) {
        activeClass = " active";
    }

    return (
        <button type="button" className={"btn btn-outline-primary my-2" + activeClass} data-bs-toggle="button" aria-pressed="false" onClick={handleClick}>{buttonName}</button>
    )
}
