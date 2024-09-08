import { useState } from "react";

export default function TeamDetails({ teamInfo, players }) {
  const [titulars, setTitulars] = useState(true);

  let playersArray;
  //If titulars are selected
  if (titulars) {
    playersArray = players.slice(0, 11);
  }
  //If reserves are selected
  else {
    playersArray = players.slice(11, players.length - 1);
  }

  return (
    <div id={teamInfo.name + "Details"} className="team-details-box">
      <div className="team-info-details">
        <img src={teamInfo.image} alt="null" />
        <p>{teamInfo.name}</p>
      </div>
      <div className="players-info">
        <div className="table-buttons">
          <button
            style={
              titulars ? { backgroundColor: "#8a83f2", color: "#853a01" } : {}
            }
            onClick={() => setTitulars(true)}
          >
            Titulars
          </button>
          <button
            style={
              !titulars ? { backgroundColor: "#8a83f2", color: "#853a01" } : {}
            }
            onClick={() => setTitulars(false)}
          >
            Reserves
          </button>
        </div>
        <div className="players-table">
          {playersArray.map((player) => {
            let color;
            if (player.Position === "GK") {
              color = "gray";
            } else if (player.Position === "DF") {
              color = "blue";
            } else if (player.Position === "MF") {
              color = "yellow";
            } else {
              color = "red";
            }

            return (
              <div key={player.ID} className="table-line">
                <p>{player.TeamNumber}</p>
                <p style={{ flexBasis: "50%" }}>{player.FullName}</p>
                <div className="position-text">
                  <p style={{ backgroundColor: color }}>{player.Position}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
