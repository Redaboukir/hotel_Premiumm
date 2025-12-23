import { Link, useNavigate } from "react-router-dom";
import { logout, isAdmin } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", gap: 15 }}>
        <Link to="/hotels">Hôtels</Link>
        <Link to="/my-reservations">Mes réservations</Link>

        {isAdmin() && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/reservations">Réservations</Link>
          </>
        )}
      </div>

      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Navbar;
