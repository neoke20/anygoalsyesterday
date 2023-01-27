import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const url = window.location.href;
const playerID = url.match(/(\d+)(?!.*\d)/);

const Person = () => {
  const [person, setPerson] = useState([]);

  const navigate = useNavigate();

  function handleClick() {
        navigate(-1);
    }

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
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
      <p className="text-center h1 text-white mt-5 detail-player-name">{person.name}</p>
      <div className="detail-player-info">
        <p>{person.dateOfBirth}</p>
        <p>{person.nationality}</p>
        <p>{person.position}</p>
        <p>{person.shirtNumber}</p>
      </div>
    </div>
  );
};

export default Person;
