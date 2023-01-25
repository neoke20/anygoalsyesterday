import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Person = () => {

  useEffect(() => {
    requestMatches();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestMatches() {
    const requestOptions = {
      method: "GET",
      headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    };
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/PL`,
      requestOptions
    );
    const json = await res.json();
    console.log(json);
  };
  return (
    <div>
    </div>
  );
};

export default Person;
