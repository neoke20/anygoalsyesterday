import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Get the url
const url = window.location.href;
// Isolate the competition code from the URL to place in the Api fetch
const competitionCode = url.match(/([A-Z])\w+/);
const matchDayNumber = url.match(/\d*$/);

const Competition = () => {
  const [allMatchDays, updateAllMatchDays] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchDay, updateMatchDay] = useState(matchDayNumber[0]);

  useEffect(() => {
    requestMatches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestMatches() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `https://api.football-data.org/v2/competitions/${competitionCode[0]}/matches?&matchday=${matchDay}`,
      requestOptions
    );
    const json = await res.json();
    setMatches(json.matches);
    // Gets the latest match day
    const getMatchDay = json.matches[0].season.currentMatchday;
    updateMatchDay(getMatchDay);
    // Creates an array of all the match days until today
    const allDays = [...Array(getMatchDay + 1).keys()];
    // Remove the 0 from the array
    allDays.shift();
    updateAllMatchDays(allDays);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    requestMatches();
  };
  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-light return">
          Return
        </button>
      </Link>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <label className="text-white" htmlFor="matchdays">
            Select another match day:
            <select
              id="matchday"
              value={matchDay}
              onChange={(e) => updateMatchDay(e.target.value)}
              onBlur={(e) => updateMatchDay(e.target.value)}
            >
              {allMatchDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          <button id="submit">Check Goals!</button>
        </form>
        {matches.map((match) =>
          match.status === "FINISHED" ? (
            // Check if there were goals, and displays yes if there were any
            match.score.fullTime.awayTeam + match.score.fullTime.homeTeam >
            0 ? (
              <div className="match-card-yes" key={match.id}>
                <div className="match-card-info">
                  <div className="flex-grow-1 team-names">
                    <a href={`team/${match.homeTeam.id}`}>
                      <h3>
                        {match.homeTeam.name}
                        <span className="more-info">+more</span>
                      </h3>
                    </a>
                    <strong>VS</strong>
                    <a href={`team/${match.awayTeam.id}`}>
                      <h3>
                        {match.awayTeam.name}
                        <span className="more-info">+more</span>
                      </h3>
                    </a>
                  </div>
                  <div className="text-center match-result">
                    <h5 className="match-day">Day {match.matchday}</h5>
                    <h5 className="stage">
                      {match.stage.replaceAll("_", " ")}
                    </h5>
                    <h4 className="pt-3">Were there any goals:</h4>
                    <h5>Yes</h5>
                  </div>
                </div>
                <div className="accordion" id={`accordionExample${match.id}`}>
                  <div className="accordion-item goal-accordion">
                    <h2 className="accordion-header" id="intro">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseOne${match.id}`}
                        aria-expanded="false"
                        aria-controls={`collapseOne${match.id}`}
                      >
                        More info about the goals (spoiler-free)
                      </button>
                    </h2>
                    <div
                      id={`collapseOne${match.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby="intro"
                      data-bs-parent={`#accordionExample${match.id}`}
                    >
                      <div className="accordion-body">
                        <h4 className="d-flex justify-content-between">
                          <button
                            className="btn btn-light first-goal-reveal"
                            onClick={() =>
                              document
                                .getElementById(`first-${match.id}`)
                                .classList.toggle("d-none")
                            }
                          >
                            Any goals in the 1st half?
                          </button>
                          <span
                            id={`first-${match.id}`}
                            className="first-goal-details d-none"
                          >
                            {match.score.halfTime.homeTeam +
                              match.score.halfTime.awayTeam >
                            0
                              ? "Yes"
                              : "No"}
                          </span>
                        </h4>
                        <h4 className="d-flex justify-content-between">
                          <button
                            className="btn btn-light second-goal-reveal"
                            onClick={() =>
                              document
                                .getElementById(`second-${match.id}`)
                                .classList.toggle("d-none")
                            }
                          >
                            Any goals in the 2nd half?
                          </button>
                          <span
                            id={`second-${match.id}`}
                            className="second-goal-details d-none"
                          >
                            {match.score.fullTime.homeTeam +
                              match.score.fullTime.awayTeam >
                            match.score.halfTime.homeTeam +
                              match.score.halfTime.awayTeam
                              ? "Yes"
                              : "No"}
                          </span>
                        </h4>
                        <div className="referees">
                          <h5>Referees:</h5>
                          <ul>
                            {match.referees.length > 0
                              ? match.referees.map((referee) => (
                                  <li key={referee.id}>
                                    <i className="far fa-futbol"></i>{" "}
                                    {referee.name} (
                                    <span className="referee-role">
                                      {referee.role.replaceAll("_", " ")}
                                    </span>
                                    )
                                  </li>
                                ))
                              : "No information about referees"}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="match-card-no" key={match.id}>
                <div className="match-card-info">
                  <div className="flex-grow-1 team-names">
                    <a href={`team/${match.homeTeam.id}`}>
                      <h3>
                        {match.homeTeam.name}
                        <span className="more-info">+more</span>
                      </h3>
                    </a>
                    <strong>VS</strong>
                    <a href={`team/${match.awayTeam.id}`}>
                      <h3>
                        {match.awayTeam.name}
                        <span className="more-info">+more</span>
                      </h3>
                    </a>
                  </div>
                  <div className="text-center match-result">
                    <h5 className="match-day">Day {match.matchday}</h5>
                    <h5 className="stage">
                      {match.stage.replaceAll("_", " ")}
                    </h5>
                    <h4 className="pt-3">Were there any goals:</h4>
                    <h5 style={{ color: "#FF4081" }}>No</h5>
                  </div>
                </div>
                <div className="accordion" id={`accordionExample${match.id}`}>
                  <div className="accordion-item goal-accordion">
                    <h2 className="accordion-header" id="intro">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseOne${match.id}`}
                        aria-expanded="false"
                        aria-controls={`collapseOne${match.id}`}
                      >
                        More info about the game (spoiler-free)
                      </button>
                    </h2>
                    <div
                      id={`collapseOne${match.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby="intro"
                      data-bs-parent={`#accordionExample${match.id}`}
                    >
                      <div className="accordion-body">
                        <div className="referees">
                          <h5>Referees:</h5>
                          <ul>
                            {match.referees.length > 0
                              ? match.referees.map((referee) => (
                                  <li key={referee.id}>
                                    <i className="far fa-futbol"></i>{" "}
                                    {referee.name} (
                                    <span className="referee-role">
                                      {referee.role.replaceAll("_", " ")}
                                    </span>
                                    )
                                  </li>
                                ))
                              : "No information about referees"}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : match.status === "CANCELLED" ? (
            <div className="match-card" key={match.id}>
              <div className="flex-grow-1 team-names">
                <a href={`team/${match.homeTeam.id}`}>
                  <h3>
                    {match.homeTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
                <strong>VS</strong>
                <a href={`team/${match.awayTeam.id}`}>
                  <h3>
                    {match.awayTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
              </div>
              <div className="text-center match-result">
                <h5 className="match-day">Day {match.matchday}</h5>
                <h5 className="stage">{match.stage.replaceAll("_", " ")}</h5>
                <h4 className="pt-3">Were there any goals:</h4>
                <h5 style={{ color: "red" }}>Cancelled</h5>
              </div>
            </div>
          ) : match.status === "SCHEDULED" ? (
            <div className="match-card" key={match.id}>
              <div className="flex-grow-1 team-names">
                <a href={`team/${match.homeTeam.id}`}>
                  <h3>
                    {match.homeTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
                <strong>VS</strong>
                <a href={`team/${match.awayTeam.id}`}>
                  <h3>
                    {match.awayTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
              </div>
              <div className="text-center match-result">
                <h5 className="match-day">Day {match.matchday}</h5>
                <h5 className="stage">{match.stage.replaceAll("_", " ")}</h5>
                <h4 className="pt-5">Were there any goals:</h4>
                <h5 style={{ lineHeight: "2rem" }}>
                  <mark>Scheduled</mark>
                </h5>
                <div className="schedule-date">
                  {match.utcDate.substr(0, 10)}
                </div>
              </div>
            </div>
          ) : (
            <div className="match-card" key={match.id}>
              <div className="flex-grow-1 team-names">
                <a href={`team/${match.homeTeam.id}`}>
                  <h3>
                    {match.homeTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
                <strong>VS</strong>
                <a href={`team/${match.awayTeam.id}`}>
                  <h3>
                    {match.awayTeam.name}
                    <span className="more-info">+more</span>
                  </h3>
                </a>
              </div>
              <div className="text-center match-result">
                <h5 className="match-day">Day {match.matchday}</h5>
                <h5 className="stage">{match.stage.replaceAll("_", " ")}</h5>
                <h4 className="pt-3">Were there any goals:</h4>
                <h5>
                  <mark>{match.status.replaceAll("_", " ").toUpperCase()}</mark>
                </h5>
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <ul id="results"></ul>
      </div>
      <div className="mb-5">
        <Link to="/">
          <button type="button" className="btn btn-light return">
            Return
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Competition;
