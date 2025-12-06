import React from "react";

const Filters = ({ filters, setFilters, onApply }) => {
  const update = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fafafa"
      }}
    >
      <h3 style={{ marginTop: 0 }}>Filters</h3>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by customer or phone"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        style={{ padding: 8, marginRight: 10, marginBottom: 10, width: 260 }}
      />

      {/* 🌍 Region */}
      <input
        type="text"
        placeholder="Region (e.g. North,South)"
        value={filters.customerRegion}
        onChange={(e) => update("customerRegion", e.target.value)}
        style={{ padding: 8, marginRight: 10, marginBottom: 10, width: 220 }}
      />

      {/* 🚻 Gender */}
      <input
        type="text"
        placeholder="Gender (Male,Female)"
        value={filters.gender}
        onChange={(e) => update("gender", e.target.value)}
        style={{ padding: 8, marginRight: 10, marginBottom: 10, width: 180 }}
      />

      {/* 🎂 Age Range */}
      <input
        type="number"
        placeholder="Min Age"
        value={filters.minAge}
        onChange={(e) => update("minAge", e.target.value)}
        style={{ padding: 8, marginRight: 10, marginBottom: 10, width: 100 }}
      />
      <input
        type="number"
        placeholder="Max Age"
        value={filters.maxAge}
        onChange={(e) => update("maxAge", e.target.value)}
        style={{ padding: 8, marginRight: 10, marginBottom: 10, width: 100 }}
      />

      <div style={{ marginTop: 10 }}>
        <button
          style={{ padding: "8px 16px", cursor: "pointer" }}
          onClick={onApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
