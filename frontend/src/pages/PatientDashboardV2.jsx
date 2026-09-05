import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function PatientDashboardV2() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const loadBookings = useCallback(async () => {
    try { const { data } = await api.get('/bookings/my-bookings'); setBookings(data.bookings); }
    catch { setBookings([]); }
  }, []);

  useEffect(() => { loadBookings(); const interval = window.setInterval(loadBookings, 15000); return () => window.clearInterval(interval); }, [loadBookings]);

  if (user.role === 'admin') return <Navigate to="/admin" replace/>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter((booking) => {
    const bookingDay = new Date(booking.testDate);
    bookingDay.setHours(0, 0, 0, 0);
    return bookingDay >= today && ['Pending', 'Confirmed'].includes(booking.status);
  }).length;
  const completed = bookings.filter((booking) => booking.status === 'Completed').length;

  return <div className="container py-5"><div><h1>Hello, {user.name}</h1><p className="text-muted mb-0">{user.email} · {user.phone}</p></div><div className="row g-3 my-3"><Stat label="Total bookings" value={bookings.length}/><Stat label="Upcoming" value={upcoming}/><Stat label="Completed" value={completed}/></div><div className="d-flex gap-2"><Link className="btn btn-primary" to="/tests">Book a Test</Link><Link className="btn btn-outline-primary" to="/bookings">Booking History</Link></div></div>;
}
function Stat({ label, value }) { return <div className="col-md-4"><div className="stat-card"><span>{label}</span><strong>{value}</strong></div></div>; }
