import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminRoomEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/rooms/${id}`).then(res => {
      setNumber(res.data.number);
      setCapacity(res.data.capacity);
      setPrice(res.data.pricePerNight);
      setAvailable(res.data.available);
      setDescription(res.data.description || "");
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/rooms/${id}`, {
      number,
      capacity,
      pricePerNight: price,
      available,
      description,
    });

    navigate(-1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Modifier la chambre</h2>

      <form onSubmit={submit}>
        <input value={number} onChange={e => setNumber(e.target.value)} placeholder="Numéro" />
        <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="Capacité" />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Prix" />

        <label>
          Disponible :
          <input
            type="checkbox"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
          />
        </label>

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <br />
        <button type="submit">💾 Sauvegarder</button>
      </form>
    </div>
  );
}

export default AdminRoomEdit;
