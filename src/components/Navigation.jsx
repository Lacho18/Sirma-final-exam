import { Link } from "react-router-dom";
import "../styles/Navigation.css";

//Navigation menu
export default function Navigation() {
  return (
    <div className="navigation">
      <img src="euro-img.png" />
      <div className="navigation-links">
        <Link to="/">Home</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/allMatches">All matches</Link>
      </div>
    </div>
  );
}
