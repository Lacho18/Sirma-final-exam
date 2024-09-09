import React from "react";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import "../styles/AllMatches.css";
import SelectedMatch from "./HomePageComp/SelectedMatch";
import getTeamsNames from "../functions/getTeamsNames";

export default function AllMatches() {
  const filesData = useContext(FilesContext);
  const [matches, setMatches] = useState([]);
  let error = "";

  useEffect(() => {
    const structuredMatches = getAllMatchesData();
    if (structuredMatches.error) {
      error = structuredMatches.error;
    } else {
      setMatches(structuredMatches);
    }
  }, []);

  function getAllMatchesData() {
    if (filesData) {
      try {
        const matches = filesData.find(
          (indexValue) => indexValue.dataType === "matches"
        );

        if (matches === undefined) {
          error = "No matches found";
          return [];
        }

        let structuredData = getTeamsNames(matches.data, filesData);

        //Adds formatted date field
        structuredData = structuredData.map((data) => {
          let options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
          };

          let date = new Date(Date.parse(data.Date));
          //Formatting date object
          let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
          );

          return { ...data, formattedDate };
        });

        return structuredData;
      } catch (error) {
        console.error(error);
        error = error.message;
        return [];
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
      let newMatches = [];
      newMatches = oldMatches.filter(
        (match) => regex.test(match.teamAName) || regex.test(match.teamBName)
      );

      return newMatches;
    });
  }

  console.log(matches);

  if (error !== "") return <div className="error">{error}</div>;

  return (
    <div className="allMatches-main-div">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search by country name"
        onChange={changeHandler}
      />
      <div className="allMatches-view">
        {matches.length === 0 ? (
          <div
            className=""
            style={{ color: "white", fontSize: "1.25em", paddingTop: "10px" }}
          >
            No matches found
          </div>
        ) : (
          <div className="selected-match-allMatches">
            {matches?.map((match) => (
              <React.Fragment key={match.id}>
                <p className="match-date">{match.formattedDate}</p>
                <SelectedMatch key={match.ID} selectedMatch={match} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
