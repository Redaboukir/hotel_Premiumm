import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  const loadReservations = async () => {
    const res = await api.get("/reservations");
    setReservations(res.data);
  };

  const cancelReservation = async (id) => {
    if (!window.confirm("Annuler cette réservation ?")) return;

    await api.delete(`/reservations/${id}`);
    setReservations(reservations.filter(r => r.id !== id));
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Réservations (Admin)</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>User</th>
            <th>Hôtel</th>
            <th>Chambre</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.user.email}</td>
              <td>{r.room.hotel.name}</td>
              <td>{r.room.number}</td>
              <td>{r.startDate}</td>
              <td>{r.endDate}</td>
              <td>
                <button
                  onClick={() => cancelReservation(r.id)}
                  style={{ color: "red" }}
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

export default AdminReservations;
