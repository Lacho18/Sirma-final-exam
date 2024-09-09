import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/HomePage.css";
import SelectedMatch from "./HomePageComp/SelectedMatch";
import HomePageHeader from "./HomePageComp/HomePageHeader";
import getTeamsNames from "../functions/getTeamsNames";
import TournamentElement from "./HomePageComp/TournamentElement";

export default function HomePage() {
  const filesData = useContext(FilesContext);
  const [selectedMatch, setSelectedMatch] = useState(null);
  let error = "";

  let structuredMatches = [];
  //Prevents from calling the functions again on error appearance
  if (error === "") {
    //Gets all the tournament matches (which are after date 26/6/2024)
    const tournamentMatches = getTournamentMatches();

    //Gets more data for the matches such as team name, image and winner of the match
    structuredMatches = structureMatchesData(tournamentMatches);
  }

  //Sorts the finals in separated arrays
  const eighthFinals = structuredMatches.slice(0, 8);
  const quarterFinals = structuredMatches.slice(8, 12);
  const semiFinals = structuredMatches.slice(12, 14);
  const finals = structuredMatches.slice(14, 15);

  //Groups all sorted finals
  let allFinals = [
    { finalsType: "eightFinals", finals: eighthFinals },
    { finalsType: "quarterFinals", finals: quarterFinals },
    { finalsType: "semiFinals", finals: semiFinals },
    { finalsType: "final", finals: finals },
  ];

  useEffect(() => {
    //Sets the first state value always on the final
    setSelectedMatch(finals[0]);
  }, []);

  //Function that gets the matches in the tournament
  function getTournamentMatches() {
    const matches = filesData.find(
      (indexValue) => indexValue.dataType === "matches"
    );

    if (matches === undefined) {
      error = "No matches found";
      return [];
    }

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
  function structureMatchesData(matches) {
    let structuredMatches;
    structuredMatches = getTeamsNames(matches, filesData);

    if (structuredMatches.error) {
      error = structuredMatches.error;
      return [];
    }

    if (structuredMatches.length !== 0) {
      return structuredMatches;
    } else {
      error = "Invalid parameters";
      return [];
    }
  }

  if (error !== "") return <div className="error">{error}</div>;

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
          {allFinals.map((finals) => (
            <div key={finals.finalsType} className={finals.finalsType}>
              {finals.finals.map((match, index) => (
                <TournamentElement
                  key={index}
                  match={match}
                  setSelectedMatch={(matchData) => setSelectedMatch(matchData)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="selected-match-div">
        <SelectedMatch selectedMatch={selectedMatch} />
      </div>
    </div>
  );
}
