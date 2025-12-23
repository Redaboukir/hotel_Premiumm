import { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";
import { Link } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getHotels()
      .then(setHotels)
      .catch(() => setError("Impossible de charger les hôtels"));
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f6f8fa", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 30 }}>🏨 Nos hôtels</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 25,
        }}
      >
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{hotel.name}</h3>
            <p>📍 {hotel.city}</p>
            <p style={{ color: "#555" }}>{hotel.description}</p>

            <p style={{ fontWeight: "bold", marginTop: 10 }}>
              💰 {hotel.pricePerNight} MAD / nuit
            </p>

            <Link
              to={`/hotels/${hotel.id}`}
              style={{
                display: "inline-block",
                marginTop: 15,
                padding: "10px 18px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Voir les chambres →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
