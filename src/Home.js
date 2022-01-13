import $ from "jquery";

const TARGETCOMPETITIONS = [
  "FL1",
  "PL",
  "SA",
  "BL1",
  "DED",
  "PD",
  "PPL",
  "BSA",
  "ELC",
];

const Home = () => {
  $.ajax({
    headers: { "X-Auth-Token": "1d76b9d5235d490a8ff940e63e44f9f1" },
    url: `https://api.football-data.org/v2/competitions`,
    dataType: "json",
    type: "GET",
  }).done(function (response) {
    const allCompetitions = response.competitions.filter((competition) =>
      TARGETCOMPETITIONS.includes(competition.code)
    );
    const competitions = document.querySelector("#competitions");
    allCompetitions.forEach((competition) => {
      const competitionName = `<a class="competition-card" href="competition/${competition.code}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${competition.area.ensignUrl});"><div class="d-flex flex-column"><h2>${competition.name}</h2><p class="country-name">(${competition.area.name})</p></div></a>`;
      competitions.insertAdjacentHTML("beforeend", competitionName);
    });
  });

  return <div id="competitions" className="cards"></div>;
};

export default Home;
