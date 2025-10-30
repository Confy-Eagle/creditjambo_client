import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState("Checking...");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 🧾 1️⃣ Fetch Balance
        const balanceRes = await api.get("/transactions/balance");
        console.log("Balance Response:", balanceRes.data);
        setBalance(balanceRes.data.balance || 0);

        // 💰 2️⃣ Fetch Transactions
        const txRes = await api.get("/transactions/history");
        console.log("Transactions Response:", txRes.data);
        const txList =
          txRes.data.transactions || txRes.data.data || txRes.data || [];
        setTransactions(Array.isArray(txList) ? txList : []);

        // 💻 3️⃣ Fetch Devices
      // 💻 3️⃣ Fetch Devices
const deviceId = localStorage.getItem("device_id");
if (deviceId) {
  const devicesRes = await api.get("/devices/my");
  const deviceList = Array.isArray(devicesRes.data)
    ? devicesRes.data
    : devicesRes.data.devices || [];
  console.log("My Devices:", deviceList);

  const device = deviceList.find(
    (d) =>
      d.device_id === deviceId ||
      d.deviceId === deviceId ||
      d.id === deviceId
  );

if (device) {
  console.log("Device returned from API:", device);
  setDeviceStatus(
    device.verified === true || device.verified === 1 || device.verified === "1"
      ? "✅ Verified"
      : "🕓 Pending Approval"
  );
} else {
  setDeviceStatus("❌ Device not found");
}

} else {
  setDeviceStatus("❌ Not registered");
}

      } catch (err) {
        console.error("Fetch Error:", err);
      }
    }

    fetchData();
    // Optional auto-refresh every 15 seconds
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            👋 Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          <Link
            to="/deposit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-150"
          >
            + Deposit
          </Link>
          <Link
            to="/withdraw"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-150"
          >
            – Withdraw
          </Link>
          <Link
            to="/device"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-150"
          >
            💻 Device
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded-lg shadow-sm">
            <h3 className="text-gray-600 font-medium">Balance</h3>
            <p className="text-2xl font-bold text-gray-800">${balance}</p>
          </div>
          <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-sm">
            <h3 className="text-gray-600 font-medium">Device</h3>
            <p className="text-lg font-bold text-gray-800">{deviceStatus}</p>
          </div>
          <div className="p-5 bg-purple-50 border-l-4 border-purple-600 rounded-lg shadow-sm">
            <h3 className="text-gray-600 font-medium">Transactions</h3>
            <p className="text-lg font-bold text-gray-800">
              {transactions.length}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Balance After</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx) => (
                  <tr
                    key={tx.id || tx._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 capitalize">{tx.type}</td>
                    <td className="p-3 font-semibold text-gray-700">
                      ${tx.amount}
                    </td>
                    <td className="p-3 text-gray-700">
                      ${tx.balance_after || tx.balanceAfter}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(tx.created_at || tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 text-gray-400 italic"
                  >
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
