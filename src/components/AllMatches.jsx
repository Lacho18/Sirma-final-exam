import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/AllMatches.css";
import SelectedMatch from "./HomePageComp/SelectedMatch";

export default function AllMatches() {
  const filesData = useContext(FilesContext);
  const [matches, setMatches] = useState({
    data: [],
  });

  console.log(matches);

  useEffect(() => {
    const structuredMatches = getAllMatchesData();
    setMatches(structuredMatches);
  }, []);

  function getAllMatchesData() {
    if (filesData) {
      try {
        const matches = filesData.find(
          (indexValue) => indexValue.dataType === "matches"
        );

        if (matches === undefined) {
          return { error: "No matches found" };
        }

        const structuredData = [];

        let teams = filesData.find(
          (indexValue) => indexValue.dataType === "teams"
        );

        if (teams === undefined) {
          return { error: "No teams found" };
        }

        matches.data.forEach((match) => {
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

          //Option for date format
          let options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
          };

          let date = new Date(Date.parse(match.Date));
          //Formatting date object
          let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
          );

          //If both teamed found, push the updated object to structuredData array
          if (teamA && teamB) {
            structuredData.push({
              ...match,
              teamAName: teamA.Name,
              teamAImage: teamA.Image,
              teamBName: teamB.Name,
              teamBAImage: teamB.Image,
              formattedDate,
              winner,
            });
          }
        });

        console.log(structuredData);

        return { data: structuredData };
      } catch (error) {
        console.error(error);
        return { error: error.message };
      }
    }
  }

  //Function that filters the array of matches by teamAName and teamBName
  function changeHandler(e) {
    const regex = new RegExp(e.target.value, "i");

    //In case all search information is deleted, returns every match
    if (e.target.value === "") {
      const structuredMatches = getAllMatchesData();
      setMatches(structuredMatches);
    }

    //Filters the matches.data array
    setMatches((oldMatches) => {
      let newMatches = {
        data: [],
      };
      newMatches.data = oldMatches.data.filter(
        (match) => regex.test(match.teamAName) || regex.test(match.teamBName)
      );

      console.log(newMatches);

      return newMatches;
    });
  }

  if (matches.error) return <div className="error">{matches.error}</div>;

  return (
    <div className="allMatches-main-div">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search by country name"
        onChange={changeHandler}
      />
      <div className="allMatches-view">
        {matches.data.length === 0 ? (
          <div
            className=""
            style={{ color: "white", fontSize: "1.25em", paddingTop: "10px" }}
          >
            No matches found
          </div>
        ) : (
          <div className="selected-match-allMatches">
            {matches?.data.map((match) => (
              <>
                <p className="match-date">{match.formattedDate}</p>
                <SelectedMatch key={match.ID} selectedMatch={match} />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
