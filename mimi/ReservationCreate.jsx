import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import AvailabilityCalendar from "../components/AvailabilityCalendar";

function ReservationCreate() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    api.get(`/rooms/${roomId}`).then((res) => setRoom(res.data));
    api
      .get(`/reservations/room/${roomId}`)
      .then((res) => setReservations(res.data));
  }, [roomId]);

  const handleSelect = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const nights =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * (room?.pricePerNight || 0);

  const handleReserve = async () => {
    if (!startDate || !endDate) {
      alert("Choisis une date d'entrée et de sortie");
      return;
    }

    try {
      await api.post("/reservations", {
        roomId,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      });

      alert("Réservation confirmée ✅");
      navigate("/my-reservations");
    } catch (e) {
      if (e.response?.status === 409) {
        alert("❌ Chambre déjà réservée sur ces dates");
      } else {
        alert("Erreur lors de la réservation");
      }
    }
  };

  if (!room) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Réserver la chambre #{room.number}</h2>

      <p>
        💰 Prix par nuit : <strong>{room.pricePerNight} MAD</strong>
      </p>

      <AvailabilityCalendar
        reservations={reservations}
        onSelect={handleSelect}
      />

      {nights > 0 && (
        <div style={{ marginTop: 15 }}>
          <p>🛏️ Nuits : {nights}</p>
          <p>
            💵 Total :{" "}
            <strong style={{ fontSize: 18 }}>{totalPrice} MAD</strong>
          </p>
        </div>
      )}

      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
        }}
        onClick={handleReserve}
        disabled={!startDate || !endDate}
      >
        Confirmer la réservation
      </button>
    </div>
  );
}

export default ReservationCreate;
