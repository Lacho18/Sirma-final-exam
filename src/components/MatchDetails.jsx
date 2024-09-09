import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/MatchDetails.css";
import MatchHeader from "./MatchDetails/MatchHeader";
import TeamFormation from "./MatchDetails/TeamFormation";
import TeamDetails from "./MatchDetails/TeamDetails";

export default function MatchDetails() {
  const { id } = useParams();
  const filesData = useContext(FilesContext);
  const [matchData, setMatchData] = useState({});
  const positions = {
    teamA: matchData.playersTeamA ? setPositions(matchData?.playersTeamA) : {},
    teamB: matchData.playersTeamB ? setPositions(matchData?.playersTeamB) : {},
  };

  useEffect(() => {
    const structuredMatch = getMatchData();
    setMatchData(structuredMatch);
  }, []);

  //Gets all necessary data from 'filesData' and structure it to a single object
  function getMatchData() {
    try {
      //Gets all matches data
      const matches = filesData.find(
        (indexValue) => indexValue.dataType === "matches"
      );

      if (matches === undefined) {
        return { error: "Matches not found" };
      }

      //Find selected match by url parameter id
      const selectedMatch = matches.data.find((match) => match.ID === id);

      if (selectedMatch === undefined) {
        return { error: "No such match found!" };
      }

      //Gets all players
      const players = filesData.find(
        (indexValue) => indexValue.dataType === "players"
      );

      if (players === undefined) {
        return { error: "No players found!" };
      }

      //Finds the players from ATeam and sets them to field 'playersTeamA'
      selectedMatch.playersTeamA = players.data.filter(
        (player) => Number(player.TeamID) === Number(selectedMatch.ATeamID)
      );

      selectedMatch.playersTeamB = players.data.filter(
        (player) => Number(player.TeamID) === Number(selectedMatch.BTeamID)
      );

      if (
        selectedMatch.playersTeamA === undefined ||
        selectedMatch.playersTeamB === undefined
      ) {
        return { error: "No players playing in this teams found!" };
      }

      //Gets all teams data
      const teams = filesData.find(
        (indexValue) => indexValue.dataType === "teams"
      );

      if (teams === undefined) {
        return { error: "No teams found" };
      }

      //Finds both teams data
      selectedMatch.teamAData = teams.data.find(
        (team) => team.ID === selectedMatch.ATeamID
      );
      selectedMatch.teamBData = teams.data.find(
        (team) => team.ID === selectedMatch.BTeamID
      );

      if (
        selectedMatch.teamAData === undefined ||
        selectedMatch.teamBData === undefined
      ) {
        return { error: "No teams with given data found!" };
      }

      //Setting the winner of the match
      let result = selectedMatch.Score.split("-");
      selectedMatch.winner =
        result[0] > result[1]
          ? selectedMatch.teamAData.Name
          : result[0] === result[1]
          ? ""
          : selectedMatch.teamBData.Name;

      return selectedMatch;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  function setPositions(players) {
    if (players.length === 0) {
      return { error: "Invalid parameters" };
    }
    if (!Array.isArray(players)) {
      return { error: "Invalid parameters" };
    }

    let objResult = {};
    let titulars = players.slice(0, 11);
    //Filters the positions in the team
    objResult.GK = titulars.filter((player) => player.Position === "GK");
    objResult.DF = titulars.filter((player) => player.Position === "DF");
    objResult.MF = titulars.filter((player) => player.Position === "MF");
    objResult.FW = titulars.filter((player) => player.Position === "FW");

    //Sets team formation
    objResult.formation = `${objResult.DF.length}-${objResult.MF.length}-${objResult.FW.length}`;

    return objResult;
  }

  if (matchData.error) return <div className="error">{matchData.error}</div>;
  if (!matchData.ID) return <div>Loading....</div>;

  return (
    <div className="match-details-main">
      <MatchHeader matchData={matchData} />

      <div className="match-navigation">
        <a href={"#" + matchData.teamAData.Name + "Formation"}>
          <span>{matchData.teamAData.Name}</span> formation
        </a>
        <a href={"#" + matchData.teamBData.Name + "Formation"}>
          <span>{matchData.teamBData.Name}</span> formation
        </a>
        <a href={"#" + matchData.teamAData.Name + "Details"}>
          <span>{matchData.teamAData.Name}</span> team details
        </a>
        <a href={"#" + matchData.teamBData.Name + "Details"}>
          <span>{matchData.teamBData.Name}</span> team details
        </a>
      </div>
      <div className="teams-formation">
        <TeamFormation
          teamData={matchData.teamAData}
          teamPositions={positions.teamA}
        />
        <TeamFormation
          teamData={matchData.teamBData}
          teamPositions={positions.teamB}
        />
      </div>

      <div className="team-details">
        <p style={{ color: "white", fontSize: "2.5em" }}>Teams details</p>
        <TeamDetails
          teamInfo={{
            name: matchData.teamAData.Name,
            image: matchData.teamAData.Image,
          }}
          players={matchData.playersTeamA}
        />
        <TeamDetails
          teamInfo={{
            name: matchData.teamBData.Name,
            image: matchData.teamBData.Image,
          }}
          players={matchData.playersTeamB}
        />
      </div>
    </div>
  );
}
