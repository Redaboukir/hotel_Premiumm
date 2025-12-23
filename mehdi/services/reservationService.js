import api from "./api";

export const getRoomAvailability = (roomId) => {
  return api.get(`/reservations/room/${roomId}`).then(res => res.data);
};

export const createReservation = (data) => {
  return api.post("/reservations", data).then(res => res.data);
};

export const getMyReservations = () => {
  return api.get("/reservations/me").then(res => res.data);
};

export const getAllReservations = () => {
  return api.get("/reservations").then(res => res.data);
};

export const cancelReservation = (id) => {
  return api.delete(`/reservations/${id}`);
};