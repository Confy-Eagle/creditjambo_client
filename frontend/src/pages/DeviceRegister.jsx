// src/pages/DeviceRegister.jsx
import { useState } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar";

export default function DeviceRegister() {
  const [deviceId, setDeviceId] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async e => {
    e.preventDefault();
    setError(""); setMsg("");
    if (!deviceId) return setError("Device ID required");
    try {
      await api.post("/devices/register", { device_id: deviceId, device_info: deviceInfo });
      // store device id locally so api sends x-device-id automatically
      localStorage.setItem('device_id', deviceId);
      setMsg('Device registered. Wait for admin verification.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Register Device</h1>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {msg && <div className="text-green-600 mb-2">{msg}</div>}
        <form onSubmit={handleRegister} className="bg-white p-4 rounded shadow">
          <label className="block mb-2">Device ID</label>
          <input value={deviceId} onChange={e => setDeviceId(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="e.g. SONY-XZ1-1234" />
          <label className="block mb-2">Device Info</label>
          <input value={deviceInfo} onChange={e => setDeviceInfo(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="Device model / OS" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Register Device</button>
        </form>
      </div>
    </>
  );
}
