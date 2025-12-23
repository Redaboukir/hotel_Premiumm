import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import ReservationCreate from "./pages/ReservationCreate";

import AdminDashboard from "./pages/admin/AdminDashboard";
import HotelCreate from "./pages/admin/HotelCreate";
import RoomCreate from "./pages/admin/RoomCreate";
import MyReservations from "./pages/MyReservations";
import AdminReservations from "./pages/admin/AdminReservations";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import AdminHotels from "./pages/admin/AdminHotels";
import AdminHotelEdit from "./pages/admin/AdminHotelEdit";
import { isAuthenticated } from "./services/auth";
import AdminHotelRooms from "./pages/admin/AdminHotelRooms";
import AdminRoomEdit from "./pages/admin/AdminRoomEdit";
function App() {
  return (
    <BrowserRouter>
      <Navbar />


      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/hotels"
          element={
            <ProtectedRoute>
              <Hotels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/:id"
          element={
            <ProtectedRoute>
              <HotelDetail />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/hotels/create"
          element={
            <AdminRoute>
              <HotelCreate />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/rooms/create"
          element={
            <AdminRoute>
              <RoomCreate />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/hotels"
  element={
    <AdminRoute>
      <AdminHotels />
    </AdminRoute>
  }
/>

<Route
  path="/admin/hotels/:id/edit"
  element={
    <AdminRoute>
      <AdminHotelEdit />
    </AdminRoute>
  }
/>
<Route path="/admin/hotels/:id/rooms" element={<AdminHotelRooms />} />


<Route
  path="/admin/rooms/:id/edit"
  element={
    <AdminRoute>
      <AdminRoomEdit />
    </AdminRoute>
  }
/>
<Route
  path="/rooms/:roomId/reserve"
  element={
    <ProtectedRoute>
      <ReservationCreate />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-reservations"
  element={
    <ProtectedRoute>
      <MyReservations />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/reservations"
  element={
    <AdminRoute>
      <AdminReservations />
    </AdminRoute>
  }
/>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
