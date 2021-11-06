import axios from 'axios';
import {useEffect, useState, useMemo} from 'react';
import Table from "./Table";
import "./../styles/Home.module.css"

export default function Home() {

    const [form_team_ID, setTeamID] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [statsData, setStatsData] = useState("");
    const [resReady, setResReady] = useState("");

    const submitRequest = async e => {
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
        setEndYear("");
        setResReady(true);
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
            Header: "Player Name",
            accessor: "playerName",
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
            accessor: "assists",
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
            accessor: "overTimeGoals",
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
            setResReady(false);
        })();
    }, []);


    return (
        <html lang="en">
        <head>

            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
        </head>
        <body>
        <div>
            {resReady === false &&
            <div className={"container"}>

                <form className={"align-content-center"} onSubmit={submitRequest}>
                    <div className="form-group row">
                        <label htmlFor="exampleInputEmail1">Enter the team ID:</label>
                        <input className="form-control" id="team_id" value={form_team_ID}  onChange={(e) => setTeamID(e.target.value)}
                               aria-describedby="emailHelp" placeholder="Enter team ID"/>
                            <small id="id_help" className="form-text text-muted">Enter the ID from one of the teams listed in the table below</small>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="start_date">Enter season start year: </label>
                        <br/>
                        <input  value={startYear}  onChange={(e) =>{
                            setStartYear(e.target.value); setEndYear(parseInt(e.target.value)+1);}} placeholder="YYYY" className="col-sm-2 col-form-label form-control" id="start"/>
                        <small id="id_help" className="form-text text-muted">Year should be less than or equal to 2019</small>

                        { endYear &&
                        <label>Season End: {endYear}</label>  }
                    </div>
                    <div className="form-group row">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <div className="container">
                    <Table columns={teams_columns} data={data}/>
                </div>
            </div>
            }

            {resReady === true &&
            <Table columns={player_stats_column} data={statsData}/>
            }
        </div>
        </body>
        </html>
    )
}



