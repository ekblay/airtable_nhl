import axios from 'axios';
import {useEffect, useState, useMemo} from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Script from 'next/script'
import Table from "../Table";
import "./../styles/Home.module.css"
import Statistics from "../Statistics";


export default function Home() {
    const [data, setData] = useState([]);

    const [form_team_ID, setTeamID] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [statsData, setStatsData] = useState("");


    //conditional navigations because I am lazy and I do not want to deal with routes
    const [formView, setFormView] = useState(false);
    const [analysisView, setAnalysisView] = useState(false);
    const [loadingView, setLoadingView] = useState(false);
    const [errorView, setErrorView] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset ,  clearErrors  } = useForm();

    const submitRequest = async () => {


        let roster;
        try {
            const result = await axios('https://statsapi.web.nhl.com/api/v1/teams/' + form_team_ID + '?expand=team.roster&season='+startYear+endYear );
            //console.log(result.data.teams[0].roster.roster);
            //player.person.id
            roster = result.data.teams[0].roster.roster;
        }catch (e) {
            setErrorView(true);
            return;
        }

        var playerStats = [];
        var res;

        setFormView(false);
        setLoadingView(true);
        for (const player of roster) {
            try {
                res = await axios('https://statsapi.web.nhl.com/api/v1/people/'+player.person.id+'/stats?stats=statsSingleSeason&season='+startYear+endYear);
                var stat = res.data.stats[0].splits[0].stat;
            } catch (e) {
                setFormView(true);
                setLoadingView(false);
                setErrorView(true);
                return;
            }

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
        setStatsData(playerStats);

        reset();
        setLoadingView(false);
        setAnalysisView(true);
        setErrorView(false);
    }

    const isTeamIDValid = (v) => {

        let valid = false;
        data.forEach(team => {
            if(team.teamId.toString() === v.toString())
                valid = true
        } )

        return valid;
    };

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

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"/>
            <Script defer src="https://code.jquery.com/jquery-3.5.1.min.js"></Script>
            <Script defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></Script>
        </head>

        <body>
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" onClick={async () =>
            {
                setTeamID("");
                setStartYear("");
                setEndYear("");
                clearErrors();

                setLoadingView(false);
                setAnalysisView(false);
                setErrorView(false);
                setFormView(true);
                setStatsData(null);
            }}>
                NHL Team Analyser
            </a>
        </nav>


        {formView  &&
        <div className={"container"}>
            <form className={" centered"} onSubmit={handleSubmit(submitRequest)}>
                {errorView &&
                <div className="alert alert-danger" role="alert">
                    We encountered an issue while retrieving the requested season. Please try a later season.
                </div>
                }
                <div className=" row form-group flex-column">
                    <label htmlFor="exampleInputEmail1">Enter the team ID:</label>
                    <input className="form-control  "
                           id="team_id" value={form_team_ID}
                           name={"team_id"}
                           {...register('team_id',{
                               validate: {
                                   isTeamIdValid: v => isTeamIDValid(v) || "*Please enter a Team ID from the table below*"
                               },
                               required: "*The team ID is required*"
                           })}
                           onChange={(e) => setTeamID(e.target.value)}

                           placeholder="Enter team ID"/>
                    <small id="id_help" className="form-text text-muted">Enter the ID from one of the teams listed in the table below</small>

                    <div className={"text-danger"}>
                        <ErrorMessage errors={errors} name="team_id">
                            {({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <span className="text-danger"  key={type}>{message}</span>
                                ))
                            }
                        </ErrorMessage>
                    </div>

                </div>
                <div className="row form-group flex-column">
                    <label htmlFor="start_date">Enter season start year: </label>

                    <input  value={startYear}
                            {...register("start",{
                                validate:{
                                    lessThanTen: v => parseInt(v) <= 2018 || "*The start year has to be less than or equal to 2018*"},
                                pattern: {value: /(?:(?:19|20)[0-9]{2})/, message: "*The start year has to be of the form YYYY*"},
                                required: "*The start year for the season is required*"}
                            )}
                            onChange={(e) =>{setStartYear(e.target.value); setEndYear(parseInt(e.target.value)+1);}}
                            placeholder="YYYY"
                            className="col-sm-2 col-form-label form-control" id="start" name={"start"}/>
                    <small id="id_help" className="form-text text-muted">Year should be less than or equal to 2018</small>

                    <div className={"text-danger"}>
                        <ErrorMessage errors={errors} name="start">
                            {({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p  key={type}>{message}</p>
                                ))
                            }
                        </ErrorMessage>
                    </div>

                </div>

                <div className="row form-group">
                    { endYear &&
                    <label>Season End: {endYear}</label>  }
                </div>

                <div className="row form-group">
                    <button type="submit" className="col  col-lg-2 btn btn-primary">Search</button>
                </div>
            </form>
            <div className={"row form-group"}>
                <button
                    onClick={(e) =>{
                        setTeamID("");
                        setStartYear("");
                        setEndYear("");
                        clearErrors();}}
                    className="col col-lg-2 btn btn-danger">Clear</button>
            </div>

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



