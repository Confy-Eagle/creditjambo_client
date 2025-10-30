// src/components/NavBar.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow p-3 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">CreditJambo</div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm">Dashboard</Link>
          <Link to="/deposit" className="text-sm">Deposit</Link>
          <Link to="/withdraw" className="text-sm">Withdraw</Link>
          <Link to="/device" className="text-sm">Device</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button className="text-sm bg-red-500 text-white px-2 py-1 rounded" onClick={handleLogout}>
                Logout
              </button>

            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
