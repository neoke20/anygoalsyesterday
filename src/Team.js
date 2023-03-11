import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ball from "./football.png";
import attacker from "./images/attacker.webp";
import midfielder from "./images/midfielder.webp";
import goalkeeper from "./images/goalkeeper.webp";
import defender from "./images/defender.webp";
import undefined from "./images/undefined.webp";
import coach from "./images/coach.webp";
import { API_KEY } from "./apiconfig";

// Get t(\d+)(?!.*\d)
const url = window.location.href;
const teamID = url.match(/(\d+)(?!.*\d)/);

const Team = () => {
  const [team, setTeam] = useState("");
  const [squad, setSquad] = useState([]);

  const navigate = useNavigate();

  function handleClick() {
        navigate(-1);
    }


  useEffect(() => {
    requestTeamInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestTeamInfo() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": API_KEY },
    };
    const res = await fetch(
      `https://api.football-data.org/v2/teams/${teamID[0]}`,
      requestOptions
    );
    const json = await res.json();
    setTeam(json);
    setSquad(json.squad);
  }
  function playerAge(year, month, day) {
    const today = new Date();
    const bday = new Date(year, month - 1, day);
    return String(Math.floor((today - bday) / 31556952000));
  }
  return (
    <div>
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
      <div className="text-center team-card">
        <div className="team-details">
          <div id="logo">
            <div className="align-self-center">
              {team.crestUrl ? (
                <img src={team.crestUrl} alt="logo" width={120} />
              ) : (
                <img src={ball} alt="logo" width={60} />
              )}
            </div>
            <div className="align-self-center">
              <p>Founded in {team.founded}</p>
              <p>Venue: {team.venue}</p>
              {team.website ? (
                <p>
                  Visit{" "}
                  <a href={team.website} target="_blank" rel="noreferrer">
                    {team.website.match(/www.*/)}
                  </a>
                </p>
              ) : null}
              <p>Colors: {team.clubColors}</p>
            </div>
          </div>
          <div className="details">
            <h2>{team.name}</h2>
            <p>{team.address}</p>
          </div>
        </div>
      </div>
      <h3 className="m-4 position">Attackers</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Offence" && player.role === "PLAYER" ? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${attacker})`,
                backgroundPosition: "bottom",
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.substr(0, 10)}{" "}
                <strong>
                  (
                  {playerAge(
                    player.dateOfBirth.substr(0, 4),
                    player.dateOfBirth.substr(5, 2),
                    player.dateOfBirth.substr(8, 2)
                  )}
                  )
                </strong>
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
            </a>
          ) : null
        )}
      </div>
      <h3 className="m-4 position">Midfielders</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Midfield" && player.role === "PLAYER" ? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${midfielder})`,
                backgroundPosition: "right bottom",
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth ? player.dateOfBirth.substr(0, 10) : null}{" "}
                <strong>
                  (
                  {player.dateOfBirth ? playerAge(
                    player.dateOfBirth.substr(0, 4),
                    player.dateOfBirth.substr(5, 2),
                    player.dateOfBirth.substr(8, 2)
                  ) : null}
                  )
                </strong>
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
            </a>
          ) : null
        )}
      </div>
      <h3 className="m-4 position">Defenders</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Defence" && player.role === "PLAYER" ? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${defender})`,
                backgroundPosition: "center",
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.substr(0, 10)}{" "}
                <strong>
                  (
                  {playerAge(
                    player.dateOfBirth.substr(0, 4),
                    player.dateOfBirth.substr(5, 2),
                    player.dateOfBirth.substr(8, 2)
                  )}
                  )
                </strong>
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
            </a>
          ) : null
        )}
      </div>
      <h3 className="m-4 position">Goalkeepers</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === "Goalkeeper" && player.role === "PLAYER" ? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${goalkeeper})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.substr(0, 10)}{" "}
                <strong>
                  (
                  {playerAge(
                    player.dateOfBirth.substr(0, 4),
                    player.dateOfBirth.substr(5, 2),
                    player.dateOfBirth.substr(8, 2)
                  )}
                  )
                </strong>
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
            </a>
          ) : null
        )}
      </div>
      <h3 className="m-4 position">Undetermined position</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.position === null  && player.role === "PLAYER"? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${undefined})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth ? player.dateOfBirth.substr(0, 10) : null}
              </div>
            </div>
            </a>
          ) : null
        )}
      </div>
      <h3 className="m-4 position">Coach</h3>
      <div className="player-grid">
        {squad.map((player) =>
          player.role === "COACH" ? (
            <a href={`person/${player.id}`} key={player.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${coach})`,
              }}
              className="player-card"
              key={player.id}
            >
              <div className="player-name">{player.name}</div>
              <div className="player-bday">
                {player.dateOfBirth.substr(0, 10)}{" "}
                <strong>
                  (
                  {playerAge(
                    player.dateOfBirth.substr(0, 4),
                    player.dateOfBirth.substr(5, 2),
                    player.dateOfBirth.substr(8, 2)
                  )}
                  )
                </strong>
              </div>
              <div className="player-nationality">({player.nationality})</div>
            </div>
            </a>
          ) : null
        )}
      </div>
        <button className="btn btn-light return mt-4" onClick={handleClick}>Return</button>
      </div>
  );
};

export default Team;
