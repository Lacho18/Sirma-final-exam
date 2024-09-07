import { useEffect, useState } from "react";
import useReadFiles from "./hooks/useReadFiles";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import MatchDetails from "./components/MatchDetails";
import TeamDetails from "./components/TeamDetails";
import { FilesContext } from "./context/FilesContext";

function App() {
  const [data, setData] = useState([]);

  const paths = [
    "/data/matches.csv",
    "/data/players.csv",
    "/data/records.csv",
    "/data/teams.csv",
  ];

  const allFilesData = useReadFiles(paths);
  console.log(allFilesData);

  return (
    <FilesContext.Provider value={allFilesData}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matchDetails" element={<MatchDetails />} />
        <Route path="teamDetails" element={<TeamDetails />} />
      </Routes>
    </FilesContext.Provider>
  );
}

export default App;
