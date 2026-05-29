import { useEffect, useState } from "react";
import { getEmissions } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEmissions().then(setData);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Emission Dashboard</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Scope</th>
            <th>Category</th>
            <th>Activity</th>
            <th>Unit</th>
            <th>CO2e</th>
            <th>Approved</th>
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
              <td>{item.is_approved ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}