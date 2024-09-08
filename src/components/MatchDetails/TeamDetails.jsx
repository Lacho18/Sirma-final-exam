export default function TeamDetails({ teamInfo, players }) {
  return (
    <div id={teamInfo.name + "Details"} className="team-details-box">
      <div className="team-info-details">
        <img src={teamInfo.image} alt="null" />
        <p>{teamInfo.name}</p>
      </div>
      <div className="players-info">
        <div className="players-table">
          {players.map((player) => {
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
              <div>
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
