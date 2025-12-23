import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    api.get(`/hotels/${id}`).then(res => setHotel(res.data));
  }, [id]);

  if (!hotel) return <p style={{ padding: 40 }}>Chargement...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* GRID 2 COLONNES */}
        <div style={styles.grid}>

          {/* ================= LEFT : HOTEL INFO ================= */}
          <div style={styles.hotelCard}>
            <h1 style={styles.hotelName}>{hotel.name}</h1>
            <p style={styles.city}>📍 {hotel.city}</p>
            <p style={styles.desc}>{hotel.description}</p>
          </div>

          {/* ================= RIGHT : ROOMS ================= */}
          <div>
            <h2 style={styles.sectionTitle}>Nos chambres</h2>

            {hotel.rooms.length === 0 && <p>Aucune chambre</p>}

            <div style={styles.roomsGrid}>
              {hotel.rooms.map(room => (
                <div key={room.id} style={styles.roomCard}>
                  
                  <div style={styles.roomHeader}>
                    <span style={styles.roomNumber}>
                      Chambre #{room.number}
                    </span>

                    {room.maintenance ? (
                      <span style={styles.badgeMaintenance}>Maintenance</span>
                    ) : room.available ? (
                      <span style={styles.badgeAvailable}>Disponible</span>
                    ) : (
                      <span style={styles.badgeUnavailable}>Indisponible</span>
                    )}
                  </div>

                  <p>👤 Capacité : <strong>{room.capacity}</strong></p>
                  <p style={styles.price}>💰 {room.pricePerNight} MAD / nuit</p>

                  {room.available && !room.maintenance && (
                    <button
                      style={styles.reserveBtn}
                      onClick={() => navigate(`/rooms/${room.id}/reserve`)}
                    >
                      Réserver
                    </button>
                  )}

                  {room.maintenance && (
                    <p style={{ color: "#f59e0b" }}>🛠 Chambre en maintenance</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HotelDetail;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 0",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: 32,
    alignItems: "start",
  },

  hotelCard: {
    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
    color: "white",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 100,
  },

  hotelName: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },

  city: {
    marginTop: 8,
    opacity: 0.9,
  },

  desc: {
    marginTop: 16,
    lineHeight: 1.5,
  },

  sectionTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 600,
  },

  roomsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },

  roomCard: {
    background: "white",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  roomHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  roomNumber: {
    fontWeight: 600,
  },

  price: {
    color: "#0284c7",
    fontWeight: 600,
    marginTop: 8,
  },

  reserveBtn: {
    marginTop: 14,
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },

  badgeAvailable: {
    background: "#dcfce7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  badgeUnavailable: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  badgeMaintenance: {
    background: "#fef3c7",
    color: "#92400e",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },
};
