export default function MatchHeader({ matchData }) {
  const result = matchData.Score.split("-");
  return (
    <div className="match-result">
      <div className="result-view">
        <div className="left-result">
          <p style={{ fontSize: "3em" }}>
            {Number(result[0]) === Number(result[1]) ? "Draw" : "Winner"}
          </p>
          {Number(result[0]) !== Number(result[1]) && (
            <div>
              {matchData.winner === matchData.teamAData.Name ? (
                <img
                  className="result-img"
                  src={matchData.teamAData.Image}
                  alt="null"
                />
              ) : (
                <img
                  className="result-img"
                  src={matchData.teamBData.Image}
                  alt="null"
                />
              )}
              <p style={{ fontSize: "2.5em" }}>{matchData.winner}</p>
            </div>
          )}
        </div>
        <div className="right-result">
          <img
            className="uefa-cup-image"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/35deb0d8-d197-4548-83cd-3f1d8ec0c34a/dgjh614-7a5c737a-9652-4cc4-8dad-0671c233393e.png/v1/fill/w_400,h_911/uefa_euro_2024_trophy_by_twistedblackheartuk_dgjh614-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1ZGViMGQ4LWQxOTctNDU0OC04M2NkLTNmMWQ4ZWMwYzM0YVwvZGdqaDYxNC03YTVjNzM3YS05NjUyLTRjYzQtOGRhZC0wNjcxYzIzMzM5M2UucG5nIiwiaGVpZ2h0IjoiPD05MTEiLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzM1ZGViMGQ4LWQxOTctNDU0OC04M2NkLTNmMWQ4ZWMwYzM0YVwvdHdpc3RlZGJsYWNraGVhcnR1ay00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.eG725G1PuLhA2cbkoXhKww-zycQK7UxvMXTiKYJrbIY"
          />
          <div className="match-result-view">
            <div>
              <p>{matchData.teamAData.Name}</p>
              <img
                className="result-img"
                style={{ width: "40px", height: "40px" }}
                src={matchData.teamAData.Image}
                alt="null"
              />
              <p>{matchData.Score}</p>
              <img
                className="result-img"
                style={{ width: "40px", height: "40px" }}
                src={matchData.teamBData.Image}
                alt="null"
              />
              <p>{matchData.teamBData.Name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
