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
        return playerStats.map((x) => {return (x.goals/x.gamesPlayed)})
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

    //Shots vs goals
    const shotsVsGoals = ()=> {
        return playerStats.map((x) => {return (x.goals/x.shots)})
    }

    const shotsData = {
        labels: label(),
        datasets: [
            {
                label: 'Shots/Goals',
                backgroundColor: 'rgba(8,28,234,0.2)',
                borderColor: 'rgb(11,227,210)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(47,255,0,0.4)',
                hoverBorderColor: 'rgb(0,88,101)',
                data: shotsVsGoals(),
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

            <div className="tab-content">

                <div className=" container" id="goals">
                    <h4>Goals Breakdown</h4>
                    <hr/>
                    <h5>
                        Understand who is scoring the most goals per game on the team. This would help to give more perspective
                         about who the best goal scorers are; not just by high numbers but by an aggregation against their respective number of games played.
                        These players are well suited for finishing well. Considerations should be made to keep them on the offensive.
                        The graph here factors in the number of games played by each player as it properly reflects their performance in this category.
                    </h5>
                    <hr/>
                    <Bar data={goalData} width={400} height={400} type={'bar'}/>
                </div>


                <hr/>
                <div className=" container " id="assists">
                    <h4>Assists Breakdown</h4>
                    <hr/>
                    <h5>
                        This information will help you understand who the playmakers on your team are.
                        These players are very well suited for supporting offensive position as they are more likely to complete good deliveries to your strikers.
                        The graph here factors in the number of games played by each player as it properly reflects their performance in this category.
                    </h5>
                    <hr/>
                    <Bar data={assistsData} width={400} height={400} type={'bar'}/>
                </div>

                <hr/>
                <div className=" container " id="power_play_goals">
                    <h4>Power Play Goals Breakdown</h4>
                    <hr/>
                    <h5>
                        This analysis helps determine what players work best on the power play and who should be on the ice during power plays. The high performers in this category show more resilience in more intense situations as seen by their
                        performances during power play moments. Using player performance here together with overtimes goal performances will give you a good understanding of who these
                        players are. The graph here factors in the number of games played by each player as it properly reflects their performance in this category.
                    </h5>
                    <hr/>
                    <Bar data={powerPlayData} width={400} height={400} type={'bar'}/>
                </div>


                <hr/>
                <div className=" container " id="over_time_goals">
                    <h4>Overtime Goals Breakdown</h4>
                    <hr/>
                    <h5>
                       This helps determine who should be on the ice during overtime and what players show up in clutch moments.
                        Using player performance here together with power play goal performances will give you a good understanding of who these
                        players are. The high performers in this category show more resilience in more intense situations as seen by their
                        performances during power play moments. The graph here factors in the number of games played by each player as it properly reflects their performance in this category.
                    </h5>
                    <hr/>
                    <Bar data={overTimeGoalsData} width={400} height={400} type={'bar'}/>
                </div>


                <hr/>
                <div className=" container " id="shots">

                    <h4>Goals vs Shots Breakdown</h4>
                    <hr/>
                    <h5>
                        This category brings to light who your most reliable players are when it comes to shot accuracy and offensive plays. The high performers in this section
                        show more shot accuracy as they have a higher percentage of goals per shots.
                    </h5>
                    <hr/>
                    <Bar data={shotsData} width={400} height={400} type={'bar'}/>
                </div>

                <hr/>
                <div className=" container " id="overall_performance">
                    <h4>Overall Breakdown</h4>
                    <hr/>
                    <h5>
                        If you want to know who your overall top players are here you go. This is an aggregation of all the other analysis against the number of games played
                        by each player. If you want to know who to sell, or keep or, which player in your squad needs major improvement, use this information to help guide your decisions.
                    </h5>
                    <hr/>
                    <Bar data={overallPerformanceData} width={400} height={400} type={'bar'}/>
                </div>

            </div>

        </div>
    );

}
