import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import SalesTable from "./components/SalesTable";
import { fetchSales } from "./api";

function App() {
  const [filters, setFilters] = useState({
    search: "",
    customerRegion: "",
    gender: "",
    minAge: "",
    maxAge: ""
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
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Retail Sales Management
      </h1>

      <Filters
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      {loading ? <p>Loading...</p> : <SalesTable data={data} />}

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button
          onClick={handlePrev}
          disabled={pagination.page <= 1}
          style={{ marginRight: 10, padding: "6px 12px" }}
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages} | Total:{" "}
          {pagination.totalItems}
        </span>
        <button
          onClick={handleNext}
          disabled={pagination.page >= pagination.totalPages}
          style={{ marginLeft: 10, padding: "6px 12px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
