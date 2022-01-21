import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

// Get the url
const url = window.location.href;
// Isolate the competition code from the URL to place in the Api fetch
const competitionCode = url.match(/([A-Z])\w+/);

const Competition = () => {
  const [year, setYear] = useState("");
  const [matchDay, updateMatchDay] = useState("1");
  const [allMatchDays, updateAllMatchDays] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    requestMatches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestMatches() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `https://api.football-data.org/v2/competitions/${competitionCode[0]}/matches?season=${year}&matchday=${matchDay}`,
      requestOptions
    );
    console.log(res);
    const json = await res.json();
    setMatches(json.matches);
    console.log(json.matches);
    // Gets the latest match day
    const getMatchDay = json.matches[0].season.currentMatchday;
    // Isolate the year the latest season started at
    const getCurrentSeason = json.matches[0].season.startDate.substring(0, 4);
    setYear(getCurrentSeason);
    // Creates an array of all the match days until today
    const allDays = [...Array(getMatchDay + 1).keys()];
    // Remove the 0 from the array
    allDays.shift();
    updateAllMatchDays(allDays);
  }
  return (
    <div>
      <div className="text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestMatches();
          }}
        >
          <label htmlFor="matchdays">
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
          <button>Submit</button>
        </form>
        {matches.map((match) =>
          match.status === "FINISHED" ? (
            match.score.fullTime.awayTeam + match.score.fullTime.homeTeam >
            0 ? (
              <div className="match-card" key={match.id}>
                <div className="flex-grow-1 team-names">
                  <h3>{match.homeTeam.name}</h3>
                  <strong>VS</strong>
                  <h3>{match.awayTeam.name}</h3>
                </div>
                <div className="text-center match-result">
                  <h4 className="pt-3">Were there any goals:</h4>
                  <h5>Yes</h5>
                </div>
              </div>
            ) : (
              <div className="match-card" key={match.id}>
                <div className="flex-grow-1 team-names">
                  <h3>{match.homeTeam.name}</h3>
                  <strong>VS</strong>
                  <h3>{match.awayTeam.name}</h3>
                </div>
                <div className="text-center match-result">
                  <h4 className="pt-3">Were there any goals:</h4>
                  <h5 style={{ color: "#FF4081" }}>No</h5>
                </div>
              </div>
            )
          ) : match.status === "CANCELLED" ? (
            <div className="match-card" key={match.id}>
              <div className="flex-grow-1 team-names">
                <h3>{match.homeTeam.name}</h3>
                <strong>VS</strong>
                <h3>{match.awayTeam.name}</h3>
              </div>
              <div className="text-center match-result">
                <h4 className="pt-3">Were there any goals:</h4>
                <h5 style={{ color: "red" }}>Cancelled</h5>
              </div>
            </div>
          ) : match.status === "SCHEDULED" ? (
            <div className="match-card" key={match.id}>
              <div className="flex-grow-1 team-names">
                <h3>{match.homeTeam.name}</h3>
                <strong>VS</strong>
                <h3>{match.awayTeam.name}</h3>
              </div>
              <div className="text-center match-result">
                <h4 className="pt-3">Were there any goals:</h4>
                <h5 style={{ lineHeight: "2rem" }}>
                  <mark>Scheduled</mark>
                </h5>
                <div className="schedule-date">
                  {match.utcDate.substr(0, 10)}
                </div>
              </div>
            </div>
          ) : (
            <h5>
              <mark>{match.status.replace("_", " ").toUpperCase()}</mark>
            </h5>
          )
        )}
      </div>
      <div>
        <ul id="results"></ul>
      </div>
    </div>
  );
};

export default Competition;

// $.ajax({
//   headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
//   url: `https://api.football-data.org/v2/competitions/${competitionCode[0]}/matches?season=2021`,
//   dataType: "json",
//   type: "GET",
// }).done(function (response) {
//   const matchesList = response.matches;
//   // Which Matchday is it?
//   let matchDay = matchesList[0].season.currentMatchday;
//   const allMatchDays = [...Array(matchDay + 1).keys()];
//   const currentMatchday = matchesList.filter((match) =>
//     match.matchday === matchDay ? match : null
//   );

//   const results = document.querySelector("#results");
//   const selectorMatchday = document.querySelector("#currentMatchday");
//   // Which competition are we currently checking
//   const currentCompetition = response.competition.name;
//   const competitionName = document.querySelector("#currentCompetition");
//   currentMatchday.forEach((match) => {
//     // Building the date
//     const rawDate = new Date(match.utcDate);
//     const matchDate = rawDate.getDate();
//     const monthOptions = { month: "long" };
//     const matchMonth = new Intl.DateTimeFormat("en-US", monthOptions).format(
//       rawDate
//     );
//     const dayOptions = { weekday: "long" };
//     const matchDay = new Intl.DateTimeFormat("en-US", dayOptions).format(
//       rawDate
//     );
//     const matchHour = rawDate.getHours();
//     const matchMinutes =
//       (rawDate.getMinutes() < 10 ? "0" : "") + rawDate.getMinutes();
//     const fullDate =
//       matchDay +
//       ", " +
//       matchDate +
//       " " +
//       matchMonth +
//       " at " +
//       matchHour +
//       ":" +
//       matchMinutes;
// const goals =
//   // Check for match status and display the right info depending
//   match.status === "FINISHED"
//     ? match.score.fullTime.homeTeam + match.score.fullTime.awayTeam > 0
//       ? `<h5>Yes</h5>`
//       : `<h5 style="color: #FF4081;">No</h5>`
//     : match.status === "CANCELLED"
//     ? `<h5 style="text-decoration: line-through;">Cancelled</h5>`
//     : match.status === "SCHEDULED"
//     ? `<h5 style="line-height: 2rem;"><mark>SCHEDULED</mark></h5><div class="schedule-date">${fullDate} your timezone</div>`
//     : `<h5"><mark>${match.status
//         .replace("_", " ")
//         .toUpperCase()}</mark></h5>`;
// const teamNames = `<div class="match-card"><div class="flex-grow-1 team-names"><h3>${match.homeTeam.name}</h3> <strong>VS</strong> <h3>${match.awayTeam.name}</h3></div> <div class="text-center match-result"><h4 class="pt-3">Were there any goals:</h4><div class="results">${goals}</div></div></div>`;
// results.insertAdjacentHTML("beforeend", teamNames);
//   });
//   // Will insert the match day number in the h2
//   selectorMatchday.insertAdjacentText("afterbegin", matchDay);
//   // Will insert the competition name below the h2
//   competitionName.insertAdjacentText("afterbegin", currentCompetition);
//   // lists all matchdays for the menu
//   const menuMatchDays = document.getElementById("matchdays");
//   allMatchDays.forEach((day) => {
//     const dayNumber = `<option key=${day} value="${day}">${day}</option>`;
//     menuMatchDays.insertAdjacentHTML("beforeend", dayNumber);
//   });
// });

// return (
//   <div>
//     <h2 className="text-center pt-4 text-white">
//       It is currently match day <span id="currentMatchday"></span>
//     </h2>
// <div className="text-center d-none">
//   <label htmlFor="matchdays">
//     Select another match day:
//     <select id="matchdays"></select>
//   </label>
// </div>
//     <p className="text-center text-white">
//       You are checking the results of the{" "}
//       <strong>
//         <span id="currentCompetition"> </span>
//       </strong>
//       competition.
//     </p>
//     <Link to="/">
//       <button type="button" className="btn btn-light return">
//         Return
//       </button>
//     </Link>
//     <div id="results"></div>
//     <Link to="/">
//       <button type="button" className="btn btn-light return mb-4">
//         Return
//       </button>
//     </Link>
//   </div>
// );
