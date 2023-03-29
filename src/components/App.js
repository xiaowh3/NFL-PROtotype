// Imports static content
import React, { useEffect, useState } from "react";
// import PLAYERS_DATA from '../data/nflplayers.json';
import Navbar from './Navbar.js';
import Footer from "./Footer.js";
import {Routes, Route, Outlet, Navigate, useNavigate} from 'react-router-dom';
import {getDatabase, ref, onValue} from 'firebase/database';
import PositionSelection from "./PositionSelection.js";
import ErrorPage from "./ErrorPage.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Imports dynamic content
import AboutUs from "./AboutUs.js";
import Homepage from "./Homepage.js";
import RankingPage from './RankingPage.js';
import PlayerDetails from "./PlayerDetails.js";
import Compare from "./Compare";
import YouVsPro from "./YouVsPro";
import SignInPage from "./SignInPage";
import ProfilePage from "./ProfilePage";
import ViewList from "./ViewList.js";

import DEFAULT_USERS from '../data/users.json';

export default function App(props) {

    const [PLAYERS_DATA, setPlayersData] = useState([]);
    

    useEffect(() => {
        const db = getDatabase();
        const dataRef = ref(db, "players");

        const unregisterFuncton = onValue(dataRef, (snapshot) => {
            setPlayersData(snapshot.val());
        })

        function cleanup() {
            unregisterFuncton();
        }

        return cleanup;

    }, []);

    // RankingPage State Usage:
    const [searchTerm, setSearchTerm ] = useState('');
    const [isAscending, setIsAscending ] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [playerSelected, setPlayerSelected] = useState(null);
    const [minHeight, setMinHeight] = useState('');
    const [maxHeight, setMaxHeight] = useState('');
    const [minWeight, setMinWeight] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [positionSelected, setPositionSelected] = useState('Quarterback');
    const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[1]);

    const navigateTo = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
                setCurrentUser(firebaseUser);
            } else {
                setCurrentUser(DEFAULT_USERS[0]);
            }
        });
    }, [])

    function selectPositionCallback(positionName) {
        setPositionSelected(positionName);
    }

    function setMinHeightCallback(amount) {
        setMinHeight(amount);
    }
    function setMaxHeightCallback(amount) {
        setMaxHeight(amount);
    }
    function setMinWeightCallback(amount) {
        setMinWeight(amount);
    }
    function setMaxWeightCallback(amount) {
        setMaxWeight(amount);
    }
    function showSearchCallback() {
        setShowSearch(!showSearch);
    }
    function showFiltersCallback() {
        setShowFilters(!showFilters);
    }

    function searchCallback(term) {
        setSearchTerm(term);
    }
    function ascendingCallback(state) {
        setIsAscending(state);
    }
    function sortCallback(sort_term) {
        setSortCriteria(sort_term);
    }
    function selectPlayer(playerObj) {
        setPlayerSelected(playerObj);
    }

    //ComparePage & YouVsPro State Usage:
    const [yourStats, setYourStats] = useState({
        "height": "0.00",
        "weight": "0.00",
        "wingspan": "0.00",
        "handsize": "0.00",
        "arm_length": "0.00",
        "vertical_jump": "0.00",
        "broad_jump": "0.00",
        "40_yard_dash": "0.00"
    });

    const [yourFilter, setYourFilter] = useState({
        'Quarterback': false,
        'Wide Receiver': false,
        'Running Back': false,
        'Center': false,
        'Linebacker': false,
        'Cornerback': false,
        'Safety': false,
        'Defensive Tackle': false
    });

    const loginUser = (userObj) => {
        console.log("logging in as", userObj.userName);
        setCurrentUser(userObj);
        if(userObj.userId !== null){
          navigateTo('/compare');
        }
    }

    return (
        <div>
            <header>
                <Navbar currentUser={currentUser} />
            </header>
            <main>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="position-select" element={<PositionSelection positionSelected={positionSelected} selectPositionCallback={selectPositionCallback}/>} />
                    <Route path="ranking" element={<RankingPage players_data={PLAYERS_DATA} search={searchTerm} setSearchCallback={searchCallback} isAscending={isAscending} setAscendingCallback={ascendingCallback} sortCriteria={sortCriteria} setSortCallback={sortCallback} showFilters={showFilters} playerSelected={playerSelected} setPlayerCallback={selectPlayer} minHeight={minHeight} setMinHeightCallback={setMinHeightCallback} minWeight={minWeight} setMinWeightCallback={setMinWeightCallback} maxHeight={maxHeight} setMaxHeightCallback={setMaxHeightCallback} maxWeight={maxWeight} setMaxWeightCallback={setMaxWeightCallback} showSearchCallback={showSearchCallback} showFiltersCallback={showFiltersCallback} showSearch={showSearch} positionSelected={positionSelected}/>} />
                    <Route path="/ranking/:playerName" element={<PlayerDetails allPlayers={PLAYERS_DATA} currentUser={currentUser}/>} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="signin" element={<SignInPage currentUser={currentUser} loginCallback={loginUser} />} />

                    {/* protected routes */}
                    <Route element={<ProtectedPage currentUser={currentUser} />}>
                        <Route path="compare" element={<Compare yourStats={yourStats} setYourStats={setYourStats} yourFilter={yourFilter} setYourFilter={setYourFilter}/>} />
                        <Route path="comparison" element={<YouVsPro players_data={PLAYERS_DATA} setPlayerCallback={selectPlayer} yourStats={yourStats} yourFilter={yourFilter}/>} />
                        <Route path="profile" element={<ProfilePage currentUser={currentUser} />}/>
                        <Route path="viewList" element={<ViewList players_data={PLAYERS_DATA} setPlayerCallback={selectPlayer} currentUser={currentUser}/>}/>
                    </Route>
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

function ProtectedPage(props) {
    //...determine if user is logged in
    if(props.currentUser.userId === null) {
      return <Navigate to="/signin" />
    }
    else {
      return <Outlet />
    }
  }