import { useEffect, useState } from "react";
import getTeamsNames from "../../functions/getTeamsNames";
import SelectedMatch from "../HomePageComp/SelectedMatch";

export default function SelectedTeamGroup({
  selectedTeam,
  filesData,
  nullSelectionHandle,
}) {
  const [teamData, setTeamData] = useState({});
  let statistics = setGroupStats(selectedTeam, teamData?.data);
  let error = "";

  useEffect(() => {
    const structuredMatches = getSelectedTeamData();
    setTeamData(structuredMatches);
  }, []);

  function getSelectedTeamData() {
    try {
      const matches = filesData.find(
        (indexValue) => indexValue.dataType === "matches"
      );

      if (matches === undefined) {
        error = "Matches not found";
        return {};
      }

      //Finds all matches that selected team participated
      const selectedMatches = matches.data.filter(
        (match) =>
          match.ATeamID === selectedTeam.ID || match.BTeamID === selectedTeam.ID
      );

      if (selectedMatches.length === 0) {
        error = "This team has not participated in any matches!";
        return {};
      }

      //Removes the matches from the tournament if there are any
      const onlyGroupsMatches = selectedMatches.filter((selectedMatch) => {
        let date = new Date(Date.parse(selectedMatch.Date));
        let groupsEndDate = new Date("Jun 26, 2024");

        if (date < groupsEndDate) return true;

        return false;
      });

      const structuredMatches = getTeamsNames(onlyGroupsMatches, filesData);

      return { data: structuredMatches };
    } catch (error) {
      console.log(error);
      error = error.message;
    }
  }

  //Sets the group stage statistics from selected team
  function setGroupStats(team, groupMatches) {
    if (!Array.isArray(groupMatches)) return null;

    let stats = {
      wins: 0,
      lost: 0,
      draw: 0,
      points: 0,
      playedMatches: groupMatches.length,
    };

    groupMatches.forEach((match) => {
      if (match.winner === team.Name) {
        stats.wins++;
        stats.points += 3;
      } else if (match.winner === "Draw") {
        stats.draw++;
        stats.points += 1;
      } else {
        stats.lost++;
      }
    });

    return stats;
  }

  if (error !== "") return <div className="error">{error}</div>;
  if (Object.keys(teamData).length === 0) return <div>Loading...</div>;

  return (
    <div className="group-section-main-div selected-team-div">
      <div>
        <button className="back-button" onClick={() => nullSelectionHandle()}>
          {"<--"}
        </button>
      </div>
      <div className="team-group-stats">
        <div className="team-stats-left">
          <p className="groups-stats-text">Groups statistics</p>
          <img src={selectedTeam.Image} />
          <p>{selectedTeam.Name}</p>
        </div>
        <div className="team-stats-right">
          {statistics && (
            <div>
              <p>
                Wins:{" "}
                <span style={{ color: "lightgreen" }}>{statistics.wins}</span>
              </p>
              <p>
                Loses: <span style={{ color: "red" }}>{statistics.lost}</span>
              </p>
              <p>
                Draw: <span style={{ color: "yellow" }}>{statistics.draw}</span>
              </p>
              <p>
                Points:{" "}
                <span style={{ color: "lightblue" }}>{statistics.points}</span>
              </p>
              <p>
                Matches:{" "}
                <span style={{ color: "orange" }}>
                  {statistics.playedMatches}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="selected-matches-groups">
        <p className="group-matches-title">
          {selectedTeam.Name} groups matches
        </p>
        {teamData.data &&
          teamData.data.map((team) => (
            <SelectedMatch key={team.ID} selectedMatch={team} />
          ))}
      </div>
    </div>
  );
}
