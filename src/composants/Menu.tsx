import { Link } from 'react-router-dom';
import {UserAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import '../style/side-menu.css';

export function Menu() {

    const {signOut} = UserAuth();

    const navigate = useNavigate();

    const test = async () => {
        await signOut();
        navigate("/login");
    }

  return (
    <aside className="side-menu">
      <div className="logo-container">
        <h2>La region </h2>
      </div>

      <nav className="nav-menu">
        <Link to="/" className="nav-item active">
          Home
        </Link>

        <Link to="/dashboard" className="nav-item active">
          Dashboard
        </Link>

        <button onClick={test} className="nav-item-button">
            Se déconnecter
        </button>
      </nav>
    </aside>
  );
}