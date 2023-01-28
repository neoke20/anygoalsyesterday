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

  function dateConvert(date) {
    date = date.replace(/-/g," ").split(" ")
    const birthday = new Date(date[0], date[1] - 1, date[2])
    return birthday.toDateString()
  }
  useEffect(() => {
    requestMatches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestMatches() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
    };
    const res = await fetch(
      `https://api.football-data.org/v2/players/${playerID[0]}`,
      requestOptions
    ).catch(error => {
    console.log(error);
  });
    const json = await res.json();
    setPerson(json);
  };
  return (
    <div>
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
      <p className="text-center h1 text-white mt-5 detail-player-name">{person.name}</p>
      <div className="detail-player-info d-flex flex-column text-center">
        {person.firstName && person.lastName ? (<p className="detail-card">Full name: {person.firstName} {person.lastName}</p>) : null}
        {person.dateOfBirth ? (<p className="detail-card">Date of birth: {dateConvert(`${person.dateOfBirth}`)}</p>) : null}
        {person.nationality && person.nationality !== person.countryOfBirth ? (<p className="detail-card">Country of birth: {person.countryOfBirth}</p>) : null}
        {person.nationality ? (<p className="detail-card">Nationality: {person.nationality}</p>) : null}
        {person.position ? (<p className="detail-card">Position: {person.position}</p>) : null}
        {person.shirtNumber ? (<p className="detail-card">Shirt number: {person.shirtNumber}</p>) : null}
      </div>
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
    </div>
  );
};

export default Person;
