import { useEffect } from "react";

// Get t(\d+)(?!.*\d)
const url = window.location.href;
const teamID = url.match(/(\d+)(?!.*\d)/);

const Team = () => {
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
  }
  return <h1>Test</h1>;
};

export default Team;
