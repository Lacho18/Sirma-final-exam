import useReadFiles from "./hooks/useReadFiles";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import MatchDetails from "./components/MatchDetails";
import TeamDetails from "./components/TeamDetails";
import { FilesContext } from "./context/FilesContext";
import Groups from "./components/Groups";
import Navigation from "./components/Navigation";
import AllMatches from "./components/AllMatches";
import RouteNotFoundPage from "./components/404Page";

function App() {
  //all files path
  const paths = [
    "public/data/matches.csv",
    "public/data/players.csv",
    "public/data/records.csv",
    "public/data/teams.csv",
  ];

  const allFilesData = useReadFiles(paths);

  if (allFilesData.length === 0)
    return <div className="error">Reading files data....</div>;

  return (
    <FilesContext.Provider value={allFilesData}>
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Sirma-final-exam/" element={<HomePage />} />
          <Route path="/matchDetails/:id" element={<MatchDetails />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/allMatches" element={<AllMatches />} />
          <Route path="/*" element={<RouteNotFoundPage />} />
        </Routes>
      </div>
    </FilesContext.Provider>
  );
}

export default App;
