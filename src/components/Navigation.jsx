import { Link } from "react-router-dom";
import "../styles/Navigation.css";

//Navigation menu
export default function Navigation() {
  return (
    <div className="navigation">
      <img src="/Sirma-final-exam/euro-img1_0.png" />
      <div className="navigation-links">
        <Link to="/">Home</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/allMatches">All matches</Link>
      </div>
    </div>
  );
}
