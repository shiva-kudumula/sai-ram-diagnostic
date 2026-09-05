import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const minimumDateTime = () => new Date().toISOString().slice(0, 16);

export default function BookTestV2() {
  const { testId } = useParams();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [form, setForm] = useState({ patientName: user.name, phone: user.phone, testDate: '', address: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { api.get(`/tests/${testId}`).then((response) => setTest(response.data.test)).catch(() => setError('Test not found.')); }, [testId]);
  const submit = async (event) => { event.preventDefault(); setError(''); setBusy(true); try { await api.post('/bookings', { ...form, testId }); navigate('/bookings'); } catch (err) { setError(err.response?.data?.message || 'Booking could not be created.'); } finally { setBusy(false); } };

  if (!test) return <div className="container py-5">{error || 'Loading test...'}</div>;
  return <div className="container py-5"><div className="booking-card shadow-sm"><h1>Book {test.name}</h1><p className="text-primary fw-bold">₹{test.price}</p>{error && <div className="alert alert-danger">{error}</div>}<form onSubmit={submit}><Input label="Full Name" value={form.patientName} onChange={(patientName) => setForm({ ...form, patientName })}/><Input label="Phone Number" type="tel" value={form.phone} onChange={(phone) => setForm({ ...form, phone })}/><Input label="Test Date & Time" type="datetime-local" min={minimumDateTime()} value={form.testDate} onChange={(testDate) => setForm({ ...form, testDate })}/><div className="mb-3"><label className="form-label">Address</label><textarea required className="form-control" rows="3" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })}/></div><button disabled={busy} className="btn btn-primary">{busy ? 'Submitting...' : 'Confirm Booking'}</button></form></div></div>;
}
function Input({ label, type = 'text', value, onChange, ...rest }) { return <div className="mb-3"><label className="form-label">{label}</label><input required type={type} className="form-control" value={value} onChange={(event) => onChange(event.target.value)} {...rest}/></div>; }
