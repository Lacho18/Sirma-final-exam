import { useContext, useEffect, useRef, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/HomePage.css";
import SelectedMatch from "./HomePageComp/SelectedMatch";
import HomePageHeader from "./HomePageComp/HomePageHeader";

export default function HomePage() {
  const filesData = useContext(FilesContext);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState({});

  //Gets all the tournament matches (which are after date 26/6/2024)
  const tournamentMatches = getTournamentMatches();

  let structuredMatches = [];
  //Prevents from infinite re-renders
  if (error.error === undefined) {
    //Gets more data for the matches such as team name, image and winner of the match
    structuredMatches = getTeamsNames(tournamentMatches);
  }

  const eighthFinals = structuredMatches.slice(0, 8);
  const quarterFinals = structuredMatches.slice(8, 12);
  const semiFinals = structuredMatches.slice(12, 14);
  const finals = structuredMatches.slice(14, 15);

  useEffect(() => {
    //Sets the first state value always on the final
    setSelectedMatch(finals[0]);
  }, []);

  //Function that gets the matches in the tournament
  function getTournamentMatches() {
    const matches = filesData.find(
      (indexValue) => indexValue.dataType === "matches"
    );

    //The last date of groups
    const groupsFinalDate = new Date(Date.parse("Jun 26, 2024"));

    const filteredMatches = matches.data.filter((match) => {
      //Parse date to work with multiple date formats
      let currentMatchDate = new Date(Date.parse(match.Date));

      if (currentMatchDate > groupsFinalDate) return true;

      return false;
    });
    return filteredMatches;
  }

  //Gets the names of the teams and add them to the matches objects
  function getTeamsNames(matches) {
    if (matches.length === 0) {
      setError({ error: "Invalid parameters" });
      return [];
    }
    if (!Array.isArray(matches)) {
      setError({ error: "Invalid parameters" });
      return [];
    }

    try {
      //Gets file data for the teams
      let teams = filesData.find(
        (indexValue) => indexValue.dataType === "teams"
      );

      if (teams === undefined) {
        setError({ error: "No teams found" });
        return [];
      }

      let structuredMatches = matches.map((match) => {
        //Finds the name of Team A
        let teamA = teams.data.find(
          (indexValue) => indexValue.ID === match.ATeamID
        );
        //Finds the name of Team B
        let teamB = teams.data.find(
          (indexValue) => indexValue.ID === match.BTeamID
        );

        let result = match.Score.split("-");
        let winner = result[0] > result[1] ? teamA.Name : teamB.Name;

        if (teamA && teamB) {
          return {
            ...match,
            teamAName: teamA.Name,
            teamAImage: teamA.Image,
            teamBName: teamB.Name,
            teamBAImage: teamB.Image,
            winner,
          };
        } else {
          return {
            ...match,
            teamAName: "",
            teamBName: "",
            teamAImage: "",
            teamBAImage: "",
            winner: "",
          };
        }
      });

      if (structuredMatches.length !== 0) {
        return structuredMatches;
      } else {
        setError({ error: "Invalid parameters" });
        return [];
      }
    } catch (error) {
      console.error(error);
      setError({ error: error.message });
      return [];
    }
  }

  if (error.error) return <div className="error">{error.error}</div>;

  return (
    <div className="home-page-main-div">
      <div className="home-page-header">
        <HomePageHeader />
      </div>
      <p style={{ fontSize: "2em", color: "white" }}>
        Bracket view of all matches in the tournament
      </p>
      <div className="tournament-structure">
        <img src="/TournamentStructure.png" />
        <div className="tournaments-view">
          {/*eight finals*/}
          <div className="eightFinals">
            {eighthFinals.map((match, index) => (
              <div
                key={index}
                className="match-names"
                onClick={() => {
                  setSelectedMatch(match);
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      match.teamAName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderStartEndRadius: "7px",
                    borderStartStartRadius: "7px",
                  }}
                >
                  <p style={{ borderBottom: "2px solid black" }}>
                    {match.teamAName}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor:
                      match.teamBName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderEndStartRadius: "7px",
                    borderEndEndRadius: "7px",
                  }}
                >
                  <p>{match.teamBName}</p>
                </div>
              </div>
            ))}
          </div>

          {/*quarter finals*/}
          <div className="quarterFinals">
            {quarterFinals.map((match, index) => (
              <div
                key={index}
                className="match-names"
                onClick={() => {
                  setSelectedMatch(match);
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      match.teamAName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderStartEndRadius: "7px",
                    borderStartStartRadius: "7px",
                  }}
                >
                  <p style={{ borderBottom: "2px solid black" }}>
                    {match.teamAName}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor:
                      match.teamBName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderEndStartRadius: "7px",
                    borderEndEndRadius: "7px",
                  }}
                >
                  <p>{match.teamBName}</p>
                </div>
              </div>
            ))}
          </div>

          {/*semi finals*/}
          <div className="semiFinals">
            {semiFinals.map((match, index) => (
              <div
                key={index}
                className="match-names"
                onClick={() => {
                  setSelectedMatch(match);
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      match.teamAName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderStartEndRadius: "7px",
                    borderStartStartRadius: "7px",
                  }}
                >
                  <p style={{ borderBottom: "2px solid black" }}>
                    {match.teamAName}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor:
                      match.teamBName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderEndStartRadius: "7px",
                    borderEndEndRadius: "7px",
                  }}
                >
                  <p>{match.teamBName}</p>
                </div>
              </div>
            ))}
          </div>

          {/*final finals*/}
          <div className="final">
            {finals.map((match, index) => (
              <div
                key={index}
                className="match-names"
                onClick={() => {
                  setSelectedMatch(match);
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      match.teamAName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderStartEndRadius: "7px",
                    borderStartStartRadius: "7px",
                  }}
                >
                  <p style={{ borderBottom: "2px solid black" }}>
                    {match.teamAName}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor:
                      match.teamBName === match.winner
                        ? "lightgreen"
                        : "rgb(252, 28, 28)",
                    borderEndStartRadius: "7px",
                    borderEndEndRadius: "7px",
                  }}
                >
                  <p>{match.teamBName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="selected-match-div">
        <SelectedMatch selectedMatch={selectedMatch} />
      </div>
    </div>
  );
}
