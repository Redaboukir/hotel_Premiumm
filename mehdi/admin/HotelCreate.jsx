import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function HotelCreate() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/hotels", {
      name,
      city,
      pricePerNight: price,
    });

    navigate("/admin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ajouter un hôtel</h2>

      <form onSubmit={submit}>
        <input placeholder="Nom" onChange={e => setName(e.target.value)} />
        <input placeholder="Ville" onChange={e => setCity(e.target.value)} />
        <input type="number" placeholder="Prix" onChange={e => setPrice(e.target.value)} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default HotelCreate;
