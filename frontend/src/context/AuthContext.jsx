import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const load = async () => { if (!localStorage.getItem('token')) return setLoading(false); try { const { data } = await api.get('/auth/me'); setUser(data.user); } catch { localStorage.removeItem('token'); } finally { setLoading(false); } }; load(); }, []);
  const login = ({ token, user: account }) => { localStorage.setItem('token', token); setUser(account); };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
