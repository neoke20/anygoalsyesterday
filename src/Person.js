import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jersey from "./images/jersey.webp";


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
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `https://api.football-data.org/v4/persons/${playerID[0]}`,
      requestOptions
    ).catch(error => {
    console.log(error);
  });
    const json = await res.json();
    console.log(json);
    setPerson(json);
  };
  return (
    <div>
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
      <div className="d-flex text-center flex-column">
      <p className="h1 text-white mt-5 detail-player-name">{person.name}</p>
        <div style={{
                backgroundImage: `url(${jersey})`,
              }}
              className="jersey-img">
          <div>
        {person.name ? (<p className="mb-0 pt-4 jersey-name">{person.name.split(" ").slice(-1)}</p>) : null}
        {person.shirtNumber ? (<p className="jersey-number">{person.shirtNumber}</p>) : null}
        </div>
        </div>
      </div>
      <div className="detail-player-info d-flex flex-column text-center">
        {person.firstName && person.lastName ? (<p className="detail-card">Full name: {person.firstName} {person.lastName}</p>) : null}
        {person.dateOfBirth ? (<p className="detail-card">Date of birth: {dateConvert(`${person.dateOfBirth}`)}</p>) : null}
        {person.nationality ? (<p className="detail-card">Nationality: {person.nationality}</p>) : null}
        {person.position ? (<p className="detail-card">Position: {person.position}</p>) : null}
      </div>
      <button className="btn btn-light return" onClick={handleClick}>Return</button>
    </div>
  );
};

export default Person;
