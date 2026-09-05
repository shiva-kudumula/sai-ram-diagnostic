import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const exit = () => { logout(); navigate('/'); };
  const brandDestination = user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/';

  return <nav className="navbar navbar-expand-lg navbar-dark site-nav sticky-top"><div className="container"><Link className="navbar-brand fw-bold" to={brandDestination}>Sai Ram <span>Diagnostic</span></Link><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span className="navbar-toggler-icon" /></button><div className="collapse navbar-collapse" id="nav"><div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">{user?.role !== 'admin' && <NavLink className="nav-link" to="/tests">Tests</NavLink>}{user?.role === 'patient' && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}{user?.role === 'admin' && <NavLink className="nav-link" to="/admin">Dashboard</NavLink>}{user ? <button className="btn btn-light btn-sm ms-lg-2" onClick={exit}>Logout</button> : <><NavLink className="nav-link" to="/login">Login</NavLink><Link className="btn btn-light btn-sm ms-lg-2" to="/register">Register</Link></>}</div></div></div></nav>;
}
