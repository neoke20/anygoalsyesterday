import { useEffect, useState } from "react";

// Get t(\d+)(?!.*\d)
const url = window.location.href;
const teamID = url.match(/(\d+)(?!.*\d)/);

const Team = () => {
  const [team, setTeam] = useState("");
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    requestTeamInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestTeamInfo() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `https://api.football-data.org/v2/teams/${teamID[0]}`,
      requestOptions
    );
    const json = await res.json();
    console.log(json);
    setTeam(json);
    setSquad(json.squad);
  }
  return (
    <div>
      <div className="text-center text-white team-card">
        <img src={team.crestUrl} alt="logo" height={120} />
        <h2>{team.name}</h2>
        <p>{team.address}</p>
        <p>Founded in {team.founded}</p>
        <p>Venue: {team.venue}</p>
        <p>
          Visit{" "}
          <a href={team.website} target="_blank" rel="noreferrer">
            team's website
          </a>
        </p>
        <p>{squad.map((player) => player.name)}</p>
      </div>
    </div>
  );
};

export default Team;
