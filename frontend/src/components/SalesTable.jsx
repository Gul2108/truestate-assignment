import React from "react";

const SalesTable = ({ data }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 10,
        background: "white"
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Customer</th>
          <th style={thStyle}>Phone</th>
          <th style={thStyle}>Region</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}>Product</th>
          <th style={thStyle}>Quantity</th>
          <th style={thStyle}>Date</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ padding: 12, textAlign: "center" }}>
              No Records Found
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item._id}>
              <td style={tdStyle}>{item["Customer Name"]}</td>
              <td style={tdStyle}>{item["Phone Number"]}</td>
              <td style={tdStyle}>{item["Customer Region"]}</td>
              <td style={tdStyle}>{item["Product Category"]}</td>
              <td style={tdStyle}>{item["Product Name"]}</td>
              <td style={tdStyle}>{item["Quantity"]}</td>
              <td style={tdStyle}>{item["Date"]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const thStyle = {
  borderBottom: "1px solid #ddd",
  padding: 8,
  textAlign: "left",
  background: "#f2f2f2",
  fontWeight: "600",
  fontSize: 14
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: 8,
  fontSize: 13
};

export default SalesTable;
