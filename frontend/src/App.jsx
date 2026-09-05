import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; import Tests from './pages/Tests'; import AuthPage from './pages/AuthPage'; import Dashboard from './pages/Dashboard'; import BookTest from './pages/BookTest'; import BookingHistory from './pages/BookingHistory'; import AdminDashboard from './pages/AdminDashboard';
import AdminConsole from './pages/AdminConsole';
import AdminConsoleV2 from './pages/AdminConsoleV2';
import BookTestV2 from './pages/BookTestV2';
import AdminConsoleV3 from './pages/AdminConsoleV3';
import PatientDashboardV2 from './pages/PatientDashboardV2';
import GuestOnlyRoute from './components/GuestOnlyRoute';
function Footer(){ return <footer className="footer"><div className="container">© 2026 Sai Ram Diagnostic Center · Opp. Govt Hospital, Kosgi, Narayanpet District</div></footer>; }
export default function App(){ return <BrowserRouter><Navbar/><main><Routes><Route path="/" element={<GuestOnlyRoute><Home/></GuestOnlyRoute>}/><Route path="/tests" element={<Tests/>}/><Route path="/login" element={<GuestOnlyRoute><AuthPage mode="login"/></GuestOnlyRoute>}/><Route path="/register" element={<GuestOnlyRoute><AuthPage mode="register"/></GuestOnlyRoute>}/><Route path="/dashboard" element={<ProtectedRoute><PatientDashboardV2/></ProtectedRoute>}/><Route path="/book/:testId" element={<ProtectedRoute><BookTest/></ProtectedRoute>}/><Route path="/bookings" element={<ProtectedRoute><BookingHistory/></ProtectedRoute>}/><Route path="/admin" element={<ProtectedRoute admin><AdminConsoleV3/></ProtectedRoute>}/></Routes></main><Footer/></BrowserRouter>; }
