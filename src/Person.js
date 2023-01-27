import { useEffect, useState } from "react";

const url = window.location.href;
const playerID = url.match(/(\d+)(?!.*\d)/);

const Person = () => {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    requestMatches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestMatches() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `http://api.football-data.org/v4/persons/${playerID[0]}`,
      requestOptions
    );
    const json = await res.json();
    console.log(json);
    setPerson(json);
  };
  return (
    <div>
      <p className="text-center h1 text-white mt-5">{person.name}</p>
    </div>
  );
};

export default Person;
