import { useContext } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/Groups.css";
import GroupSection from "./HomePageComp/GroupSection";

export default function Groups() {
  const filesData = useContext(FilesContext);
  //Gets only the teams data
  const teamsData = filesData.find((file) => file.dataType === "teams");

  //array of every group
  let groups = ["A", "B", "C", "D", "E", "F"];

  //Function thats structure all teams in array of groups
  function getTeamsByGroup(groups) {
    let groupedByGroups = groups.map((singleGroup) => {
      let objStructure = {
        group: singleGroup,
        teams: [],
      };

      //filters the current object by the given group
      objStructure.teams = teamsData.data.filter((team) =>
        team.Group.includes(singleGroup)
      );

      return objStructure;
    });

    return groupedByGroups;
  }

  let groupedTeams = getTeamsByGroup(groups);

  console.log(groupedTeams);

  return (
    <div className="main-div-homepage">
      <p className="title">Groups</p>
      <div className="homepage-data">
        {groupedTeams.map((singleGroup, index) => (
          <GroupSection key={index} groupData={singleGroup} />
        ))}
      </div>
    </div>
  );
}
