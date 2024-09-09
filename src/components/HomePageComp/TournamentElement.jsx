export default function TournamentElement({ match, setSelectedMatch }) {
  return (
    <div
      className="match-names"
      onClick={() => {
        setSelectedMatch(match);
      }}
    >
      <div
        style={{
          backgroundColor:
            match.teamAName === match.winner
              ? "lightgreen"
              : "rgb(252, 28, 28)",
          borderStartEndRadius: "7px",
          borderStartStartRadius: "7px",
        }}
      >
        <p style={{ borderBottom: "2px solid black" }}>{match.teamAName}</p>
      </div>
      <div
        style={{
          backgroundColor:
            match.teamBName === match.winner
              ? "lightgreen"
              : "rgb(252, 28, 28)",
          borderEndStartRadius: "7px",
          borderEndEndRadius: "7px",
        }}
      >
        <p>{match.teamBName}</p>
      </div>
    </div>
  );
}
