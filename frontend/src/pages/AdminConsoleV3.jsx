import { useEffect, useRef, useState } from 'react';
import api from '../services/api';

const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const categories = ['Laboratory', 'Hematology', 'Microbiology', 'Biochemistry', 'Immunology', 'Serology', 'Diabetes', 'Profile', 'Hormone', 'Pathology', 'Cardiology', 'Vitamin', 'Imaging'];
const blankTest = { name: '', price: '', category: 'Laboratory', description: '', isAvailable: true };

export default function AdminConsoleV3() {
  const [tab, setTab] = useState('dashboard');
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(blankTest);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const load = () => Promise.all([api.get('/tests?includeUnavailable=true'), api.get('/admin/bookings')]).then(([testResult, bookingResult]) => { setTests(testResult.data.tests); setBookings(bookingResult.data.bookings); }).catch((err) => setError(err.response?.data?.message || 'Could not load admin data.'));
  useEffect(() => { load(); }, []);

  const openEditor = (test) => { setTab('tests'); setEditingId(test._id); setForm({ name: test.name, price: test.price, category: test.category, description: test.description || '', isAvailable: test.isAvailable }); window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); };
  const resetForm = () => { setEditingId(null); setForm(blankTest); };
  const saveTest = async (event) => { event.preventDefault(); setError(''); try { const payload = { ...form, price: Number(form.price) }; if (editingId) await api.put(`/admin/tests/${editingId}`, payload); else await api.post('/admin/tests', payload); resetForm(); load(); } catch (err) { setError(err.response?.data?.message || 'Could not save test.'); } };
  const toggle = async (test) => { try { await api.put(`/admin/tests/${test._id}`, { isAvailable: !test.isAvailable }); load(); } catch (err) { setError(err.response?.data?.message || 'Could not update test.'); } };
  const remove = async (test) => { if (!window.confirm(`Delete ${test.name} permanently?`)) return; try { await api.delete(`/admin/tests/${test._id}`); load(); } catch (err) { setError(err.response?.data?.message || 'Could not delete test.'); } };
  const changeStatus = async (id, status) => { try { await api.put(`/admin/bookings/${id}`, { status }); load(); } catch (err) { setError(err.response?.data?.message || 'Could not update booking.'); } };
  const available = tests.filter((test) => test.isAvailable).length;
  const pending = bookings.filter((booking) => booking.status === 'Pending').length;

  return <div className="container py-5"><h1>Admin Dashboard</h1><p className="text-muted">Centre-wide booking and test management.</p>{error && <div className="alert alert-danger">{error}</div>}<div className="d-flex flex-wrap gap-2 mb-4"><Tab active={tab === 'dashboard'} onClick={() => setTab('dashboard')}>Dashboard</Tab><Tab active={tab === 'tests'} onClick={() => setTab('tests')}>Manage Tests</Tab><Tab active={tab === 'bookings'} onClick={() => setTab('bookings')}>Manage Bookings</Tab></div>{tab === 'dashboard' && <><div className="row g-3"><Metric label="Available tests" value={available}/><Metric label="Disabled tests" value={tests.length - available}/><Metric label="Total bookings" value={bookings.length}/><Metric label="Pending bookings" value={pending}/></div><h2 className="h4 mt-5">Recent Patient Bookings</h2><Bookings bookings={bookings.slice(0, 5)} onChange={changeStatus}/></>}{tab === 'tests' && <div className="row g-4"><div className="col-lg-4"><div ref={formRef}><TestForm title={editingId ? 'Edit Test' : 'Add Test'} form={form} setForm={setForm} onSubmit={saveTest} submitLabel={editingId ? 'Save Changes' : 'Add Test'} onCancel={editingId ? resetForm : null}/></div></div><div className="col-lg-8"><h2 className="h4">All Tests</h2>{tests.map((test) => <div className="d-flex flex-wrap gap-2 align-items-center border-bottom py-2" key={test._id}><span className="flex-grow-1">{test.name} — ₹{test.price} {!test.isAvailable && <em className="text-muted">(disabled)</em>}</span><button className="btn btn-sm btn-outline-primary" onClick={() => openEditor(test)}>Edit</button><button className="btn btn-sm btn-outline-secondary" onClick={() => toggle(test)}>{test.isAvailable ? 'Disable' : 'Enable'}</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(test)}>Delete</button></div>)}</div></div>}{tab === 'bookings' && <><h2 className="h4">All Patient Bookings</h2><Bookings bookings={bookings} onChange={changeStatus}/></>}</div>;
}

function Tab({ active, onClick, children }) { return <button className={`btn ${active ? 'btn-primary' : 'btn-outline-primary'}`} onClick={onClick}>{children}</button>; }
function Metric({ label, value }) { return <div className="col-sm-6 col-lg"><div className="stat-card h-100"><span>{label}</span><strong>{value}</strong></div></div>; }
function TestForm({ title, form, setForm, onSubmit, submitLabel, onCancel }) { const input = (key, type = 'text') => <input required type={type} className="form-control mb-2" placeholder={key} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })}/>; return <form className="bg-white border rounded p-4" onSubmit={onSubmit}><h2 className="h4">{title}</h2>{input('name')}{input('price', 'number')}<select required className="form-select mb-2" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select>{input('description')}<label className="form-check mb-3"><input className="form-check-input" type="checkbox" checked={form.isAvailable} onChange={(event) => setForm({ ...form, isAvailable: event.target.checked })}/><span className="form-check-label">Available for booking</span></label><button className="btn btn-primary w-100">{submitLabel}</button>{onCancel && <button className="btn btn-link w-100 mt-2" type="button" onClick={onCancel}>Cancel edit</button>}</form>; }
function Bookings({ bookings, onChange }) { return <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Patient</th><th>Test</th><th>Booked date & time</th><th>Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking._id}><td>{booking.patientName}<br/><small>{booking.phone}</small></td><td>{booking.testName}<br/>₹{booking.price}</td><td>{new Date(booking.createdAt).toLocaleString()}</td><td><select className="form-select form-select-sm" value={booking.status} onChange={(event) => onChange(booking._id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table>{!bookings.length && <p className="text-muted">No bookings yet.</p>}</div>; }
