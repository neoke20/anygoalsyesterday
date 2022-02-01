import { useEffect, useState } from "react";
import attacker from "./images/attacker.webp";
import midfielder from "./images/midfielder.webp";
import goalkeeper from "./images/goalkeeper.webp";
import defender from "./images/defender.webp";
import undefined from "./images/undefined.webp";

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
      </div>
      <h3 className="text-white text-center">Attackers</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Attacker" ? (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${attacker})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.match(/\d{4}-\d{2}-\d{2}/)}
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
          ) : null
        )}
      </div>
      <h3 className="text-white text-center">Midfielders</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Midfielder" ? (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${midfielder})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.match(/\d{4}-\d{2}-\d{2}/)}
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
          ) : null
        )}
      </div>
      <h3 className="text-white text-center">Defenders</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Defender" ? (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${defender})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.match(/\d{4}-\d{2}-\d{2}/)}
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
          ) : null
        )}
      </div>
      <h3 className="text-white text-center">Goalkeepers</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Goalkeeper" ? (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${goalkeeper})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.match(/\d{4}-\d{2}-\d{2}/)}
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
          ) : null
        )}
      </div>
      <h3 className="text-white text-center">Undetermined position</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === null ? (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${undefined})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.match(/\d{4}-\d{2}-\d{2}/)}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Team;
