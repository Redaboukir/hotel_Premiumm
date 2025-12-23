import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function AdminHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get("/hotels").then(res => setHotels(res.data));
  }, []);

  const deleteHotel = async (id) => {
    if (!window.confirm("Supprimer cet hôtel ?")) return;
    await api.delete(`/hotels/${id}`);
    setHotels(hotels.filter(h => h.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", padding: 40, background: "#f8fafc" }}>
      <h2 style={{ marginBottom: 20 }}>🏨 Gestion des hôtels</h2>

      <Link to="/admin/hotels/create">
        <button style={btnPrimary}>➕ Ajouter un hôtel</button>
      </Link>

      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Ville</th><th>Prix</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.city}</td>
                <td>{h.pricePerNight} MAD</td>
                <td>
                  <Link to={`/admin/hotels/${h.id}/rooms`}>🛏️</Link>{" "}
                  <Link to={`/admin/hotels/${h.id}/edit`}>✏️</Link>{" "}
                  <button onClick={() => deleteHotel(h.id)} style={btnDanger}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  marginTop: 20,
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
};

const table = { width: "100%", borderCollapse: "collapse" };
const btnPrimary = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer"
};
const btnDanger = {
  ...btnPrimary,
  background: "#dc2626"
};

export default AdminHotels;
