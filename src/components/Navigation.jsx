import { Link } from "react-router-dom";
import "../styles/Navigation.css";

//Navigation menu
export default function Navigation() {
  return (
    <div className="navigation">
      <img src="/Sirma-final-exam/euro-img1_0.png" />
      <div className="navigation-links">
        <Link to="/Sirma-final-exam/">Home</Link>
        <Link to="/Sirma-final-exam/groups">Groups</Link>
        <Link to="/Sirma-final-exam/allMatches">All matches</Link>
      </div>
    </div>
  );
}
