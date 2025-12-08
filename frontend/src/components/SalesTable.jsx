import React from "react";

const SalesTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>👤 Customer</th>
          <th>📞 Phone</th>
          <th>📍 Region</th>
          <th>🏷️ Category</th>
          <th>📦 Product</th>
          <th>📊 Quantity</th>
          <th>📅 Date</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>
              No Records Found
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item._id}>
              <td>{item["Customer Name"]}</td>
              <td>{item["Phone Number"]}</td>
              <td>{item["Customer Region"]}</td>
              <td>{item["Product Category"]}</td>
              <td>{item["Product Name"]}</td>
              <td>{item["Quantity"]}</td>
              <td>{item["Date"]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SalesTable;
