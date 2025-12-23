import { useState } from "react";

function AvailabilityCalendar({ reservations = [], onSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // 🔴 check si la date est réservée
  const isReserved = (date) => {
    const d = date.toISOString().split("T")[0];

    return reservations.some((r) => {
      return d >= r.startDate && d < r.endDate;
    });
  };

  // 🟦 check si date sélectionnée
  const isSelected = (date) => {
    if (!startDate) return false;
    if (startDate && !endDate)
      return date.toDateString() === startDate.toDateString();

    return date >= startDate && date <= endDate;
  };

  const handleClick = (date) => {
    if (isReserved(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      setEndDate(date);
      onSelect(startDate, date);
    }
  };

  const changeMonth = (offset) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + offset,
        1
      )
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => changeMonth(-1)}>⬅</button>
        <h4>
          {currentMonth.toLocaleString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <button onClick={() => changeMonth(1)}>➡</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 5,
        }}
      >
        {[...Array(daysInMonth)].map((_, i) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            i + 1
          );

          const reserved = isReserved(date);
          const selected = isSelected(date);

          return (
            <div
              key={i}
              onClick={() => handleClick(date)}
              style={{
                padding: 10,
                textAlign: "center",
                cursor: reserved ? "not-allowed" : "pointer",
                background: reserved
                  ? "#ef4444"
                  : selected
                  ? "#60a5fa"
                  : "#86efac",
                color: "#000",
                borderRadius: 6,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 10 }}>
        🟥 Réservé | 🟩 Disponible | 🟦 Sélection
      </p>
    </div>
  );
}

export default AvailabilityCalendar;
