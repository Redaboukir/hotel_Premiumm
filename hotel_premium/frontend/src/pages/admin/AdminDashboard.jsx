import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const MONTHS = [
  "Jan","Fév","Mar","Avr","Mai","Juin",
  "Juil","Août","Sep","Oct","Nov","Déc"
];

function AdminDashboard() {
  const currentYear = new Date().getFullYear();

  const [stats, setStats] = useState(null);
  const [year, setYear] = useState(currentYear);
  const [byMonth, setByMonth] = useState([]);
  const [occupancy, setOccupancy] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  useEffect(() => {
    api
      .get(`/admin/stats/reservations-by-month?year=${year}`)
      .then(res => setByMonth(res.data || []));

    api
      .get(`/admin/stats/occupancy?year=${year}`)
      .then(res => setOccupancy(res.data));
  }, [year]);

  if (!stats) return <p style={{ padding: 40 }}>Chargement...</p>;

  const maxValue = Math.max(
    1,
    ...byMonth.map(m => Number(m.total))
  );

  const getMonthValue = (monthIndex) => {
    const found = byMonth.find(
      m => Number(m.month) === monthIndex + 1
    );
    return found ? Number(found.total) : 0;
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: 40,
      background: "linear-gradient(135deg,#eef2ff,#f8fafc)"
    }}>
      <h2 style={{ fontSize: 28 }}>📊 Dashboard Admin</h2>

      {/* ================= YEAR SELECT ================= */}
      <select
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        style={{ padding: 8, margin: "20px 0" }}
      >
        {[currentYear - 1, currentYear, currentYear + 1].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {/* ================= BAR CHART ================= */}
      <h3>📅 Réservations par mois ({year})</h3>

      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        height: 200,
        marginTop: 20
      }}>
        {MONTHS.map((label, i) => {
          const value = getMonthValue(i);
          const height = (value / maxValue) * 180;

          return (
            <div key={i} style={{ textAlign: "center", width: 40 }}>
              <div
                style={{
                  height,
                  background: "#6366f1",
                  borderRadius: 6,
                  transition: "0.3s"
                }}
                title={`${value} réservation(s)`}
              />
              <small>{label}</small>
            </div>
          );
        })}
      </div>

      {/* ================= OCCUPANCY ================= */}
      {occupancy && (
        <div style={{ marginTop: 40 }}>
          <h3>🏨 Taux d’occupation</h3>
          <p>
            {occupancy.occupiedRooms} / {occupancy.totalRooms} chambres
          </p>
          <strong style={{ fontSize: 24 }}>
            {occupancy.occupancyRate} %
          </strong>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <Link to="/admin/hotels">➡️ Gérer hôtels</Link>{" "}
        |{" "}
        <Link to="/admin/reservations">➡️ Réservations</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
