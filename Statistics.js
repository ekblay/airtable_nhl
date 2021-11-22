//Statistics.js
import React, {useState} from "react";
import {Bar} from 'react-chartjs-2';
import Table from "./Table";
export default function Statistics ({playerStats}) {


    const label = () => {
        return playerStats.map(x => x.playerName)
    }


    //Goals
    const goals = ()=> {
        return playerStats.map((x) => {return (x.shots/x.gamesPlayed)})
    }
    const goalData = {
        labels: label(),
        datasets: [
            {
                label: 'Goals/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: goals(),
                indexAxis: 'y'
            }
        ]
    };



    //Assists
    const assists = ()=> {
        return playerStats.map((x) => {return (x.assists/x.gamesPlayed)})
    }

    const assistsData = {
        labels: label(),
        datasets: [
            {
                label: 'Assists/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: assists(),
                indexAxis: 'y'
            }
        ]
    };


    //Power Play Goals
    const powerPlayGoals = ()=> {
        return playerStats.map((x) => {return (x.powerPlayGoals/x.gamesPlayed)})
    }

    const powerPlayData = {
        labels: label(),
        datasets: [
            {
                label: 'Power Play Goals/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: powerPlayGoals(),
                indexAxis: 'y'
            }
        ]
    };


    //Overtime Goals
    const overTimeGoals = ()=> {
        return playerStats.map((x) => {return (x.overTimeGoals/x.gamesPlayed)})
    }

    const overTimeGoalsData = {
        labels: label(),
        datasets: [
            {
                label: 'Overtime Goals/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: overTimeGoals(),
                indexAxis: 'y'
            }
        ]
    };

    //Shots
    const shots = ()=> {
        return playerStats.map((x) => {return (x.shots/x.gamesPlayed)})
    }

    const shotsData = {
        labels: label(),
        datasets: [
            {
                label: 'Shots/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: shots(),
                indexAxis: 'y'
            }
        ]
    };

    //Overall Performance
    const overallPerformance = ()=> {
        return playerStats.map((x) => {return ((x.shots + x.assists + x.overTimeGoals + x.powerPlayGoals)/x.gamesPlayed)})
    }

    const overallPerformanceData = {
        labels: label(),
        datasets: [
            {
                label: '(Sum of all Stats)/Games Played',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: overallPerformance(),
                indexAxis: 'y'
            }
        ]
    };
    const [goal, setGoals] = useState(true);
    const [assist, setAssist] = useState(false);
    const [ppG, setPpg] = useState(false);
    const [otG, setOtg] = useState(false);
    const [shot, setShot] = useState(false);
    const [overall, setOverall] = useState(false);

    const toggleGoals = () => {
        setGoals(true);
        setAssist(false);
        setPpg(false);
        setOtg(false);
        setShot(false);
        setOverall(false);
    }

    const toggleAssist = () => {
        setGoals(false);
        setAssist(true);
        setPpg(false);
        setOtg(false);
        setShot(false);
        setOverall(false);
    }

    const togglePpg = () => {
        setGoals(false);
        setAssist(false);
        setPpg(true);
        setOtg(false);
        setShot(false);
        setOverall(false);
    }
    const toggleOtg = () => {
        setGoals(false);
        setAssist(false);
        setPpg(false);
        setOtg(true);
        setShot(false);
        setOverall(false);
    }
    const toggleShot = () => {
        setGoals(false);
        setAssist(false);
        setPpg(false);
        setOtg(false);
        setShot(true);
        setOverall(false);
    }
    const toggleOverall = () => {
        setGoals(false);
        setAssist(false);
        setPpg(false);
        setOtg(false);
        setShot(false);
        setOverall(true);
    }

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button onClick={toggleGoals}>Goals</button>
                </li>

                <li className="nav-item">
                    <button onClick={toggleAssist}>Assists</button>
                </li>
                <li className="nav-item">
                    <button onClick={togglePpg}>Power Play Goals</button>
                </li>
                <li className="nav-item">
                    <button onClick={toggleOtg}>Over Time Goals</button>

                </li>
                <li className="nav-item">
                    <button onClick={toggleShot}>Shots</button>
                </li>

                <li className="nav-item">
                    <button onClick={toggleOverall}>Overall Performance</button>
                </li>
            </ul>


            <div className="tab-content">
                {goal &&
                <div className=" container" id="goals">
                    <h4>Goals Breakdown</h4>
                    <Bar data={goalData} width={400} height={400} type={'bar'}/>
                </div>
                }

                {assist &&
                <div className=" container " id="assists">
                    <h4>Assists Breakdown</h4>
                    <Bar data={assistsData} width={400} height={400} type={'bar'}/>
                </div>
                }
                {ppG &&
                <div className=" container " id="power_play_goals">
                    <h4>Power Play Goals Breakdown</h4>
                    <Bar data={powerPlayData} width={400} height={400} type={'bar'}/>
                </div>
                }

                {otG &&
                <div className=" container " id="over_time_goals">
                    <h4>Overtime Goals Breakdown</h4>
                    <Bar data={overTimeGoalsData} width={400} height={400} type={'bar'}/>
                </div>
                }

                {shot &&
                <div className=" container " id="shots">
                    <h4>Shots Breakdown</h4>
                    <Bar data={shotsData} width={400} height={400} type={'bar'}/>
                </div>
                }
                {overall &&
                <div className=" container " id="overall_performance">
                    <h4>Overall Breakdown</h4>
                    <Bar data={overallPerformanceData} width={400} height={400} type={'bar'}/>
                </div>
                }
            </div>

        </div>
    );

}
