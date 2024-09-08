export default function TeamFormation({ teamData, teamPositions }) {
  return (
    <div id={teamData.Name + "Formation"} style={{ padding: "30px 0" }}>
      <div className="title-formation">
        <img src={teamData.Image} />
        <p>{teamData.Name}</p>
      </div>
      <div className="formation">
        <p
          style={{
            fontSize: "1.5em",
            textAlign: "center",
            paddingBottom: "15px",
          }}
        >
          Formation {teamPositions.formation}
        </p>
        <div className="stadium-div">
          <img src="/stadium.avif" />
          <div
            className={"formation-heroes formation-" + teamPositions.formation}
          >
            <div className="GK">
              {teamPositions.GK.map((player) => (
                <div className="player-diagram">
                  <p>{player.FullName}</p>
                  <div
                    style={{
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <p>{player.Position}</p>
                </div>
              ))}
            </div>

            <div className="DF">
              {teamPositions.DF.map((player) => (
                <div className="player-diagram">
                  <p>{player.FullName}</p>
                  <div
                    style={{
                      backgroundColor: "blue",
                    }}
                  ></div>
                  <p>{player.Position}</p>
                </div>
              ))}
            </div>

            <div className="MF">
              {teamPositions.MF.map((player) => (
                <div className="player-diagram">
                  <p>{player.FullName}</p>
                  <div
                    style={{
                      backgroundColor: "yellow",
                    }}
                  ></div>
                  <p>{player.Position}</p>
                </div>
              ))}
            </div>

            <div className="FW">
              {teamPositions.FW.map((player) => (
                <div className="player-diagram">
                  <p>{player.FullName}</p>
                  <div
                    style={{
                      backgroundColor: "red",
                    }}
                  ></div>
                  <p>{player.Position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
