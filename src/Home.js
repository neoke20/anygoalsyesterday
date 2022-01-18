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
      const competitionName = `<a class="competition-card" href="competition/${competition.code}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${competition.area.ensignUrl});"><div class="d-flex flex-column"><h2>${competition.name}</h2><p class="country-name">(${competition.area.name})</p></div></a>`;
      competitions.insertAdjacentHTML("beforeend", competitionName);
    });
  });

  return (
    <div>
      <div className="container text-center">
        <p className="text-white">
          TL;DR: See if there were any goals in last nights' game without being
          spoiled of the final result
        </p>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="intro">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Read More
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="intro"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>
                  This application was made for people who live overseas and
                  usually wait the next day to watch their team's
                  soccer/football game because it is in the middle of the night.
                  It can sometime be disappointing to end up watching a game
                  where the end result is 0-0 and feel like a waste of time, but
                  checking the score is out of the question because there would
                  be no point watching the game in the end.
                </p>
                <p>
                  The application will only let you know whether there were
                  goals in the game you want to watch or not, and will never
                  display any kind of result, so you can decide if you want to
                  watch the game or not and not be worried of spoilers.
                </p>
                <p>Happy watching!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="competitions" className="cards"></div>
    </div>
  );
};

export default Home;
