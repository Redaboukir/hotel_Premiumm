import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function AdminHotelRooms() {
  const { id: hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // form add room
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState("");

  // ======================
  // LOAD ROOMS BY HOTEL
  // ======================
  useEffect(() => {
    api.get(`/rooms/by-hotel/${hotelId}`)
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hotelId]);

  // ======================
  // ADD ROOM
  // ======================
  const addRoom = () => {
    if (!number || !price) {
      alert("Champs requis");
      return;
    }

    api.post("/rooms", {
      hotelId: hotelId,
      number: number,
      capacity: capacity,
      pricePerNight: price
    }).then(res => {
      setRooms([...rooms, res.data]);
      setNumber("");
      setCapacity(1);
      setPrice("");
    });
  };

  // ======================
  // TOGGLE MAINTENANCE
  // ======================
  const toggleMaintenance = (id) => {
    api.put(`/rooms/${id}/maintenance`).then(res => {
      setRooms(
        rooms.map(r => (r.id === id ? res.data : r))
      );
    });
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🛏️ Chambres de l’hôtel #{hotelId}</h2>

      {/* ===================== */}
      {/* ADD ROOM FORM */}
      {/* ===================== */}
      <h3>➕ Ajouter une chambre</h3>

      <input
        placeholder="Numéro"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />

      <input
        type="number"
        placeholder="Capacité"
        value={capacity}
        onChange={e => setCapacity(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Prix / nuit"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
      />

      <button onClick={addRoom}>Ajouter</button>

      <hr />

      {/* ===================== */}
      {/* ROOMS TABLE */}
      {/* ===================== */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Capacité</th>
            <th>Prix</th>
            <th>Disponible</th>
            <th>Maintenance</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.number}</td>
              <td>{room.capacity}</td>
              <td>{room.pricePerNight}</td>
              <td>{room.available ? "✅ Oui" : "❌ Non"}</td>
              <td>{room.maintenance ? "🛠️ Oui" : "—"}</td>
              <td>
                <button onClick={() => toggleMaintenance(room.id)}>
                  {room.maintenance
                    ? "Enlever maintenance"
                    : "Mettre maintenance"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default AdminHotelRooms;
