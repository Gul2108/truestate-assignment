import React from "react";

const regions = ["North", "South", "East", "West", "Central"];
const genders = ["Male", "Female"];
const categories = ["Clothing", "Beauty", "Electronics", "Grocery", "Other"];

const Filters = ({ filters, setFilters, onApply }) => {
  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFromArray = (list, value) => {
    if (list.includes(value)) {
      return list.filter((v) => v !== value);
    }
    return [...list, value];
  };

    return (
    <div className="filters-card">

      <h3>🔍 Filters</h3>

      {/* Search */}
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by customer name or phone"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="search-input"
          style={{ maxWidth: "100%" }}
        />
      </div>

      {/* Regions multi-select */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: "14px" }}>📍 Customer Region</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10 }}>
          {regions.map((r) => (
            <label key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={filters.customerRegion.includes(r)}
                onChange={() =>
                  update(
                    "customerRegion",
                    toggleFromArray(filters.customerRegion, r)
                  )
                }
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender multi-select */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: "14px" }}>👥 Gender</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10 }}>
          {genders.map((g) => (
            <label key={g} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={filters.gender.includes(g)}
                onChange={() =>
                  update("gender", toggleFromArray(filters.gender, g))
                }
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age range */}
      <div style={{ marginBottom: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: "14px" }}>📅 Min Age</div>
          <input
            type="number"
            value={filters.minAge}
            onChange={(e) => update("minAge", e.target.value)}
            placeholder="Min"
            style={{ 
              padding: "10px 12px", 
              width: "100%", 
              border: "1.5px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s ease"
            }}
          />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: "14px" }}>📅 Max Age</div>
          <input
            type="number"
            value={filters.maxAge}
            onChange={(e) => update("maxAge", e.target.value)}
            placeholder="Max"
            style={{ 
              padding: "10px 12px", 
              width: "100%", 
              border: "1.5px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s ease"
            }}
          />
        </div>
      </div>

      {/* Category multi-select */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: "14px" }}>🏷️ Product Category</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10 }}>
          {categories.map((c) => (
            <label key={c} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={filters.category.includes(c)}
                onChange={() =>
                  update("category", toggleFromArray(filters.category, c))
                }
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onApply}
      >
        ✓ Apply Filters
      </button>
    </div>
  );
};

export default Filters;
