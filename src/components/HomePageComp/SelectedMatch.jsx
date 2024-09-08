import { Link } from "react-router-dom";
import "../../styles/SelectedMatch.css";

export default function SelectedMatch({ selectedMatch }) {
  if (!selectedMatch) return <div>Select a match from the tournament</div>;

  const matchResult = selectedMatch.Score.split("-");

  return (
    <div className="selected-match">
      <div className="selected-match-info">
        <div className="selected-team-view">
          <img src={selectedMatch.teamAImage} />
          <p>{selectedMatch.teamAName}</p>
        </div>
        <div className="result">
          <p>
            <span>{matchResult[0]}</span> : <span>{matchResult[1]}</span>
          </p>
        </div>
        <div className="selected-team-view">
          <img src={selectedMatch.teamBImage} />
          <p>{selectedMatch.teamBName}</p>
        </div>
      </div>
      <Link
        style={{ color: "#11123d" }}
        to={`/matchDetails/${selectedMatch.ID}`}
      >
        View more
      </Link>
    </div>
  );
}
