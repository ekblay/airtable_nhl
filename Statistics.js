//Statistics.js
import React from "react";
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
                backgroundColor: 'rgba(255,99,132,0.2)',
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
                backgroundColor: 'rgba(255,99,132,0.2)',
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
                backgroundColor: 'rgba(255,99,132,0.2)',
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
                backgroundColor: 'rgba(255,99,132,0.2)',
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
                backgroundColor: 'rgba(255,99,132,0.2)',
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
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: overallPerformance(),
                indexAxis: 'y'
            }
        ]
    };
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#goals">Goals</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#assists">Assists</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#power_play_goals">Power Play Goals</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#over_time_goals">Over Time Goals</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#shots">Shots</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#overall_performance">Overall Performance</a>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active" id="goals">
                    <h2>Goals Breakdown</h2>
                    <Bar data={goalData} width={400} height={400} type={'bar'}/>
                </div>

                <div className="tab-pane container fade" id="assists">
                    <h2>Assists Breakdown</h2>
                    <Bar data={assistsData} width={400} height={400} type={'bar'}/>
                </div>

                <div className="tab-pane container fade" id="power_play_goals">
                    <h2>Power Play Goals Breakdown</h2>
                    <Bar data={powerPlayData} width={400} height={400} type={'bar'}/>
                </div>

                <div className="tab-pane container fade" id="over_time_goals">
                    <h2>Overtime Goals Breakdown</h2>
                    <Bar data={overTimeGoalsData} width={400} height={400} type={'bar'}/>
                </div>

                <div className="tab-pane container fade" id="shots">
                    <h2>Shots Breakdown</h2>
                    <Bar data={shotsData} width={400} height={400} type={'bar'}/>
                </div>

                <div className="tab-pane container fade" id="overall_performance">
                    <h2>Overall Breakdown</h2>
                    <Bar data={overallPerformanceData} width={400} height={400} type={'bar'}/>
                </div>
            </div>

        </div>
    );

}
