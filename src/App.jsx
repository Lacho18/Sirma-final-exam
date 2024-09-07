import { useEffect, useState } from "react";
import useReadFiles from "./hooks/useReadFiles";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import MatchDetails from "./components/MatchDetails";
import TeamDetails from "./components/TeamDetails";
import { FilesContext } from "./context/FilesContext";
import Groups from "./components/Groups";

function App() {
  const [data, setData] = useState([]);

  const paths = [
    "/data/matches.csv",
    "/data/players.csv",
    "/data/records.csv",
    "/data/teams.csv",
  ];

  const allFilesData = useReadFiles(paths);

  if (allFilesData.length === 0) return <div>Loading....</div>;

  return (
    <FilesContext.Provider value={allFilesData}>
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matchDetails" element={<MatchDetails />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </div>
    </FilesContext.Provider>
  );
}

export default App;
