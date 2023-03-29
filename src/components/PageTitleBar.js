import React from "react";


// change what this returns based on what page you are on
export default function PageTitleBar(props) {

    return (
        <RankingTitle search={props.search} setSearchCallback={props.setSearchCallback} showSearch={props.showSearch}
        showFilters={props.showFilters} showSearchCallback={props.showSearchCallback} showFiltersCallback={props.showFiltersCallback} positionSelected={props.positionSelected}/>
    )
}

function RankingTitle(props) { 
    let searchClasses = "d-none search_bar";
    if(props.showSearch) {
        searchClasses = "d-block search_bar";
    }
    let filterClasses = "d-none";
    if(props.showFilters) {
        filterClasses = "d-block";
    }

    function handleSearchClick(event) {
        props.showSearchCallback();
    }
    function handleFilterClick(event) {
        props.showFiltersCallback();
    }

    function handleSearchChange(event) {
        props.setSearchCallback(event.target.value);
    }
    return (
        <div>
            <div className="page_title d-flex">
                <button className="rank_search btn btn-light" type="button" onClick={handleSearchClick}>Search</button>
                <h1>{props.positionSelected}</h1>
                <button className="rank_filter btn btn-light" type="button" onClick={handleFilterClick}>Filter</button>
            </div>
            <div className={searchClasses} value={props.search} onChange={handleSearchChange}>
                <textarea placeholder="Search By Name" className="form-control" aria-label="With textarea"></textarea>
            </div>
        </div>
    )
}