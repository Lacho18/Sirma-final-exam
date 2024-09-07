import useReadFiles from "./hooks/useReadFiles";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import MatchDetails from "./components/MatchDetails";
import TeamDetails from "./components/TeamDetails";
import { FilesContext } from "./context/FilesContext";
import Groups from "./components/Groups";
import Navigation from "./components/Navigation";
import AllMatches from "./components/AllMatches";

function App() {
  //all files path
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
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matchDetails/:id" element={<MatchDetails />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/allMatches" element={<AllMatches />} />
        </Routes>
      </div>
    </FilesContext.Provider>
  );
}

export default App;
