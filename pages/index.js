import axios from 'axios';
import {useEffect, useState, useMemo} from 'react';
import { useForm } from "react-hook-form";
import Script from 'next/script'
import { Alert } from 'react-bootstrap';
import Table from "../Table";
import "./../styles/Home.module.css"
import Statistics from "../Statistics";

export default function Home() {

    const [form_team_ID, setTeamID] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [statsData, setStatsData] = useState("");


    //conditional navigations because I am lazy and I do not want to deal with routes
    const [formView, setFormView] = useState(false);
    const [analysisView, setAnalysisView] = useState(false);
    const [loadingView, setLoadingView] = useState(false);

    const { register, errors } = useForm();
    const submitRequest = async e => {
        setFormView(false);
        setLoadingView(true);

        e.preventDefault();
        const result = await axios('https://statsapi.web.nhl.com/api/v1/teams/' + form_team_ID + '?expand=team.roster&season='+startYear+endYear );
        //console.log(result.data.teams[0].roster.roster);

        //player.person.id
        const roster = result.data.teams[0].roster.roster;

        var playerStats = [];
        var res;
        for (const player of roster) {
            res = await axios('https://statsapi.web.nhl.com/api/v1/people/'+player.person.id+'/stats?stats=statsSingleSeason&season='+startYear+endYear);
            // console.log(player);
            var stat = res.data.stats[0].splits[0].stat;
            playerStats.push({
                playerId: player.person.id,
                playerName: player.person.fullName,
                gamesPlayed: stat.games ? stat.games : 0,
                goals: stat.goals ? stat.goals : 0,
                assists: stat.assists ? stat.assists : 0,
                powerPlayGoals: stat.powerPlayGoals ? stat.powerPlayGoals : 0,
                overTimeGoals: stat.overTimeGoals ? stat.overTimeGoals: 0,
                shots: stat.shots ? stat.shots :0
            })
        }
        console.log(playerStats);
        setStatsData(playerStats);

        setTeamID("");
        setEndYear("");
        setStartYear("");


        setLoadingView(false);
        setAnalysisView(true);
    }


    const teams_columns = useMemo(   () => [
            {
                Header: "Team ID",
                accessor: "teamId",
            },
            {
                Header: "Abbreviation",
                accessor: "abbreviation"
            },
            {
                Header: "Team Name",
                accessor: "name"
            }

        ],
        []
    );

    const player_stats_column = useMemo( () => [
        {
            Header: "Player ID",
            accessor: "playerId"
        },
        {
            Header: "Player Name",
            accessor: "playerName"
        },
        {
            Header: "Games Played",
            accessor: "gamesPlayed"
        },
        {
            Header: "Goals",
            accessor: "goals"
        }, {
            Header: "Assists",
            accessor: "assists"
        },
        {
            Header: "Shots",
            accessor: "shots"
        },
        {
            Header: "Power Play Goals",
            accessor: "powerPlayGoals"
        },
        {
            Header: "Overtime Goals",
            accessor: "overTimeGoals"
        }
    ],[]);

    function filterCanadianTeams(team) {
        return (team.id === 8 || team.id === 9 || team.id === 10 || team.id === 20 || team.id === 22 ||
            team.id === 23 || team.id === 52);

    }
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const results = await axios('https://statsapi.web.nhl.com/api/v1/teams');
            const filteredTeam  = results.data.teams.filter(team => filterCanadianTeams(team));
            const mappedTeams = filteredTeam.map(x => {return {teamId: x.id, abbreviation: x.abbreviation, name: x.name }});
            setData(mappedTeams);
            setFormView(true);
        })();
    }, []);


    return (
        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></Script>
            <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script>
        </head>

        <body>


        {formView  &&
        <div className={"container "}>
            <form className={" centered"} onSubmit={submitRequest}>
                <div className=" row form-group ">
                    <label htmlFor="exampleInputEmail1">Enter the team ID:</label>
                    <input className="form-control  "
                           id="team_id" value={form_team_ID}
                        // ref={register}
                           required={true}
                           onChange={(e) => setTeamID(e.target.value)}
                           aria-describedby="emailHelp"
                           placeholder="Enter team ID"/>
                    <small id="id_help" className="form-text text-muted">Enter the ID from one of the teams listed in the table below</small>
                </div>
                <div className="row form-group flex-column">
                    <label htmlFor="start_date">Enter season start year: </label>

                    <input  value={startYear}
                            required={true}
                        // ref={register(valida)}
                            onChange={(e) =>{setStartYear(e.target.value); setEndYear(parseInt(e.target.value)+1);}}
                            placeholder="YYYY"
                            className="col-sm-2 col-form-label form-control" id="start"/>
                    <small id="id_help" className="form-text text-muted">Year should be less than or equal to 2018</small>
                </div>

                <div className="row form-group">
                    { endYear &&
                    <label>Season End: {endYear}</label>  }
                </div>

                <div className="row form-group">
                    <button type="submit" className="col  col-lg-2 btn btn-primary">Search</button>
                    <button
                        onClick={(e) =>{ setTeamID("");
                        setStartYear("");
                        setEndYear("");}}
                        className=" button-margin col col-lg-2 btn btn-danger">Clear</button>
                </div>
            </form>
            <div className="row">
                <Table columns={teams_columns} data={data}/>
            </div>
        </div>
        }

        {loadingView  &&
        <div className={"d-flex justify-content-center"}>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        }
        {analysisView  &&
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#statistics">Statistics Table</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#analysis">Statistics Analysis</a>
                </li>
            </ul>


            <div className="tab-content">
                <div className="tab-pane container active" id="statistics">
                    <Table columns={player_stats_column} data={statsData}/>
                </div>
                <div className="tab-pane container fade" id="analysis">
                    <Statistics playerStats={statsData}/>
                </div>

            </div>
        </div>
        }


        </body>
        </html>
    )
}



