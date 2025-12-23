import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function RoomCreate() {
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/hotels").then(res => setHotels(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/rooms", {
      hotelId,
      number,
      capacity,
      pricePerNight: price,
    });

    navigate("/admin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ajouter une chambre</h2>

      <form onSubmit={submit}>
        <select onChange={e => setHotelId(e.target.value)} required>
          <option value="">Choisir un hôtel</option>
          {hotels.map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>

        <input placeholder="Numéro" onChange={e => setNumber(e.target.value)} />
        <input type="number" placeholder="Capacité" onChange={e => setCapacity(e.target.value)} />
        <input type="number" placeholder="Prix" onChange={e => setPrice(e.target.value)} />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default RoomCreate;
