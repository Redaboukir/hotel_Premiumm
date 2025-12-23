import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminHotelEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/hotels/${id}`).then(res => {
      setName(res.data.name);
      setCity(res.data.city);
      setPrice(res.data.pricePerNight);
      setDescription(res.data.description || "");
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/hotels/${id}`, {
      name,
      city,
      pricePerNight: price,
      description
    });

    navigate("/admin/hotels");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Modifier l’hôtel</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Ville"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

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

export default AdminHotelEdit;
