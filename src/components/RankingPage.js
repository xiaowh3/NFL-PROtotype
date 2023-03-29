import React from "react";

import PlayerCard from "./PlayerCard.js";
import SortColumn from "./SortColumn.js";
import PageTitleBar from "./PageTitleBar.js";
import _ from 'lodash';

export default function RankingPage(props) {

    let position_players_data = props.players_data.filter((player) => {
        return player.Pos === props.positionSelected;
    })


    let players_data = _.sortBy(position_players_data, "name");
    if(props.sortCriteria !== "") {
        players_data = _.sortBy(players_data, "measurables." + props.sortCriteria);
        _.reverse(players_data);
    }

    let filtered_data = players_data;
    if((props.minHeight !== '' &&  props.maxHeight !== '')) {
        if(props.maxHeight >= props.minHeight) {
            filtered_data = filtered_data.filter((player) => {
                return (player.measurables.height >= props.minHeight && player.measurables.height <= props.maxHeight);
            })
        }
    }

    if((props.minWeight !== '' &&  props.maxWeight !== '')) {
        if(props.maxWeight >= props.minWeight) {
            filtered_data = filtered_data.filter((player) => {
                return (player.measurables.weight >= props.minWeight && player.measurables.weight <= props.maxWeight);
            })
        }
    }

    const searched_data = filtered_data.filter((player) => {
        if(props.search === '') {
            return true;
        } else {
            const casedPlayerName = player.Player.toLowerCase();
            const casedSearchTerm = props.search.toLowerCase();
            return casedPlayerName.includes(casedSearchTerm);
        }
    })

    let cardArray = (
        <p className="h3 text-center">Sorry! There were no matches.</p>
    )
    if(searched_data.length !== 0) {
        let index = 0;
        cardArray = searched_data.map((player) => {
            index = index + 1;
            return <PlayerCard key={player.Player} player={player} cardNumber={index} playerSelected={props.playerSelected} selectPlayerCallback={props.setPlayerCallback}/>;
        })
        if(props.isAscending) {
            _.reverse(cardArray);
        }
    }

    let containerClasses = "rank_container";
    if(props.showFilters) {
        containerClasses = "";
    }

    return (
        <div>
        <PageTitleBar search={props.search} setSearchCallback={props.setSearchCallback} showSearchCallback={props.showSearchCallback} showFiltersCallback={props.showFiltersCallback} showSearch={props.showSearch} showFilters={props.showFilters} positionSelected={props.positionSelected}/>
        <div className={containerClasses}>
            <SortColumn search={props.search} setSearchCallback={props.setSearchCallback} isAscending={props.isAscending} setAscendingCallback={props.setAscendingCallback} players_data={players_data} sortCriteria={props.sortCriteria} setSortCallback={props.setSortCallback} showFilters={props.showFilters} minHeight={props.minHeight} setMinHeightCallback={props.setMinHeightCallback} maxHeight={props.maxHeight} setMaxHeightCallback={props.setMaxHeightCallback} minWeight={props.minWeight} setMinWeightCallback={props.setMinWeightCallback} maxWeight={props.maxWeight} setMaxWeightCallback={props.setMaxWeightCallback} />
            <section className="card_stack">
                {cardArray}    
            </section>
         </div>
         </div>

    )
}




