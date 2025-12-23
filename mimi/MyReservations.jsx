import { useEffect, useState } from "react";
import api from "../services/api";

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get("/reservations/me").then(res => setReservations(res.data));
  }, []);

  const cancelReservation = async (id) => {
    if (!window.confirm("Annuler cette réservation ?")) return;
    await api.delete(`/reservations/${id}`);
    setReservations(reservations.filter(r => r.id !== id));
  };

  return (
    <div style={{ padding: 40, background: "#f6f8fa", minHeight: "100vh" }}>
      <h2>📅 Mes réservations</h2>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <thead style={{ background: "#22c55e", color: "white" }}>
          <tr>
            <th style={th}>Hôtel</th>
            <th style={th}>Chambre</th>
            <th style={th}>Début</th>
            <th style={th}>Fin</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td style={td}>{r.room.hotel.name}</td>
              <td style={td}>#{r.room.number}</td>
              <td style={td}>{r.startDate}</td>
              <td style={td}>{r.endDate}</td>
              <td style={td}>
                <button
                  onClick={() => cancelReservation(r.id)}
                  style={{ color: "red", border: "none", background: "none" }}
                >
                  ❌ Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: 12, textAlign: "left" };
const td = { padding: 12, borderBottom: "1px solid #eee" };

export default MyReservations;
