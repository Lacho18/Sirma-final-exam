import { useContext, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/Groups.css";
import GroupSection from "./Groups/GroupSection";
import SelectedTeamGroup from "./Groups/SelectedTeamGroup";

export default function Groups() {
  const filesData = useContext(FilesContext);
  const [selectedTeam, setSelectedTeam] = useState(null);

  //Gets only the teams data
  const teamsData = filesData.find((file) => file.dataType === "teams");
  if (teamsData === undefined) {
    return <div className="error">No teams found</div>;
  }

  let error = "";

  //array of every group
  let groups = ["A", "B", "C", "D", "E", "F"];

  //Function thats structure all teams in array of groups
  function getTeamsByGroup(groups) {
    if (groups.length === 0) {
      error = "Groups should be provided!";
      return;
    }

    let groupedByGroups = groups.map((singleGroup) => {
      let objStructure = {
        group: singleGroup,
        teams: [],
      };

      //filters the current object by the given group
      objStructure.teams = teamsData.data.filter(
        (team) => team.Group === singleGroup
      );

      if (objStructure.teams.length === 0) {
        error = "Teams in group " + singleGroup + " does not exist!";
        return {};
      }

      return objStructure;
    });

    return groupedByGroups;
  }

  //Sets the clicked team and update the state
  function selectionHandle(id) {
    let teamSelected = teamsData.data.find(
      (indexValue) => indexValue.ID === id
    );
    setSelectedTeam(teamSelected);
  }

  //Nulls the state
  function nullSelectionHandle() {
    setSelectedTeam(null);
  }

  let groupedTeams = getTeamsByGroup(groups);

  if (error !== "") return <div className="error">{error}</div>;

  return (
    <div className="main-div-homepage">
      <p className="title">Groups</p>
      <div className="homepage-data">
        {selectedTeam ? (
          <SelectedTeamGroup
            selectedTeam={selectedTeam}
            filesData={filesData}
            nullSelectionHandle={nullSelectionHandle}
          />
        ) : (
          groupedTeams.map((singleGroup, index) => (
            <GroupSection
              key={index}
              groupData={singleGroup}
              selectionHandle={selectionHandle}
            />
          ))
        )}
      </div>
    </div>
  );
}
