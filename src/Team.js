const Team = (props) => {
  return (
    <div class="match-card">
      <div class="flex-grow-1 team-names">
        <h3>${props.homeTeam.name}</h3> <strong>VS</strong>{" "}
        <h3>${props.awayTeam.name}</h3>
      </div>{" "}
    </div>
  );
};

export default Team;
