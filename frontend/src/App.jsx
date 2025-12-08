import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import SalesTable from "./components/SalesTable";
import { fetchSales } from "./api";

function App() {
  const [filters, setFilters] = useState({
  search: "",
  customerRegion: [],   
  gender: [],           
  minAge: "",
  maxAge: "",
  category: []          
});


  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [loading, setLoading] = useState(false);

  const loadSales = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        pageSize: 10,
        search: filters.search || undefined,
        customerRegion: filters.customerRegion || undefined,
        gender: filters.gender || undefined,
        minAge: filters.minAge || undefined,
        maxAge: filters.maxAge || undefined
      };

      const res = await fetchSales(params);
      setData(res.data || []);
      setPagination(res.pagination || { page: 1, totalPages: 1, totalItems: 0 });
    } catch (err) {
      console.error(err);
      alert("Error fetching sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilters = () => {
    loadSales(1);
  };

  const handlePrev = () => {
    if (pagination.page > 1) {
      loadSales(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      loadSales(pagination.page + 1);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
        Retail Sales Management
      </h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "32px" }}>
        Track and analyze your sales data with powerful filters
      </p>

      <Filters
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      {loading ? <p className="loading-text">Loading...</p> : <SalesTable data={data} />}

      <div className="pagination-container">
        <button
          onClick={handlePrev}
          disabled={pagination.page <= 1}
        >
          ← Previous
        </button>
        <span className="pagination-info">
          Page {pagination.page} of {pagination.totalPages} | Total: {pagination.totalItems}
        </span>
        <button
          onClick={handleNext}
          disabled={pagination.page >= pagination.totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default App;
