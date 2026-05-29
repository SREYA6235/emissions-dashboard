import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [sapFuel, setSapFuel] = useState("");
  const [sapDate, setSapDate] = useState("");

  const [kwh, setKwh] = useState("");
  const [utilDate, setUtilDate] = useState("");

  const [distance, setDistance] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [data, setData] = useState([]);

  // Load initial dummy data
  const loadData = () => {
    setData([
      {
        id: 1,
        scope: "Scope 1",
        category: "Fuel",
        activity_value: 50,
        unit: "L",
        co2e: 120,
        is_approved: false,
      },
    ]);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ SAP Submit (FIXED)
  const handleSAP = () => {
    const newEntry = {
      id: Date.now(),
      scope: "Scope 1",
      category: "Fuel",
      activity_value: Number(sapFuel),
      unit: "L",
      co2e: sapFuel * 2.4, // dummy calc
      is_approved: false,
    };

    setData((prev) => [...prev, newEntry]);

    setSapFuel("");
    setSapDate("");
  };

  // ✅ Utility Submit (FIXED)
  const handleUtility = () => {
    const newEntry = {
      id: Date.now(),
      scope: "Scope 2",
      category: "Electricity",
      activity_value: Number(kwh),
      unit: "kWh",
      co2e: kwh * 0.9,
      is_approved: false,
    };

    setData((prev) => [...prev, newEntry]);

    setKwh("");
    setUtilDate("");
  };

  // ✅ Travel Submit (FIXED)
  const handleTravel = () => {
    const newEntry = {
      id: Date.now(),
      scope: "Scope 3",
      category: "Travel",
      activity_value: Number(distance),
      unit: "km",
      co2e: distance * 0.2,
      is_approved: false,
    };

    setData((prev) => [...prev, newEntry]);

    setDistance("");
    setTravelDate("");
  };

  // ✅ APPROVE / REJECT FIXED
  const updateStatus = (id, status) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_approved: status === "approve",
            }
          : item
      )
    );
  };

  return (
    <div className="app-container">
      <h1 className="title">🌿 Emissions Dashboard</h1>

      {/* FORMS */}
      <div className="grid">
        <div className="card">
          <h3>⛽ SAP (Fuel)</h3>
          <input
            placeholder="Fuel used (liters)"
            value={sapFuel}
            onChange={(e) => setSapFuel(e.target.value)}
          />
          <input
            type="date"
            value={sapDate}
            onChange={(e) => setSapDate(e.target.value)}
          />
          <button onClick={handleSAP}>Submit SAP</button>
        </div>

        <div className="card">
          <h3>⚡ Utility</h3>
          <input
            placeholder="kWh"
            value={kwh}
            onChange={(e) => setKwh(e.target.value)}
          />
          <input
            type="date"
            value={utilDate}
            onChange={(e) => setUtilDate(e.target.value)}
          />
          <button onClick={handleUtility}>Submit Utility</button>
        </div>

        <div className="card">
          <h3>✈️ Travel</h3>
          <input
            placeholder="Distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
          <button onClick={handleTravel}>Submit Travel</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Scope</th>
              <th>Category</th>
              <th>Activity</th>
              <th>Unit</th>
              <th>CO2e</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.scope}</td>
                <td>{item.category}</td>
                <td>{item.activity_value}</td>
                <td>{item.unit}</td>
                <td>{item.co2e}</td>

                <td>
                  <span className={item.is_approved ? "approved" : "pending"}>
                    {item.is_approved ? "Approved" : "Pending"}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="approve"
                    onClick={() => updateStatus(item.id, "approve")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject"
                    onClick={() => updateStatus(item.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}