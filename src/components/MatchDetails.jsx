import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../context/FilesContext";

export default function MatchDetails() {
  const { id } = useParams();
  const filesData = useContext(FilesContext);
  const [matchData, setMatchData] = useState({});

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

      return selectedMatch;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  if (matchData.error) return <div className="error">{matchData.error}</div>;
  if (!matchData.ID) return <div>Loading....</div>;

  return (
    <div>
      <h1>Match Details</h1>
    </div>
  );
}
