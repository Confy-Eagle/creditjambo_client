// src/pages/Deposit.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    const value = parseFloat(amount);
    if (!value || value <= 0) return setError("Enter a valid amount");
    try {
      const res = await api.post("/transactions/deposit", { amount: value, description: desc });
      setSuccess(`Deposit successful. New balance: ${res.data.balance}`);
      setAmount(""); setDesc("");
      // navigate back to dashboard after 1s
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Deposit</h1>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <label className="block mb-2">Amount</label>
          <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border p-2 rounded mb-3" />
          <label className="block mb-2">Description (optional)</label>
          <input value={desc} onChange={e => setDesc(e.target.value)} className="w-full border p-2 rounded mb-3" />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Deposit</button>
        </form>
      </div>
    </>
  );
}
