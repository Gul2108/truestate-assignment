// backend/src/controllers/salesController.js
import { fetchSales } from "../services/salesService.js";

const parseCsvParam = (value) => {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

export const getSales = async (req, res, next) => {
  try {
    const {
      search,
      customerRegion,
      gender,
      minAge,
      maxAge,
      productCategory,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page = 1,
      pageSize = 10
    } = req.query;

    const filters = {
      search: search?.trim() || "",
      regions: parseCsvParam(customerRegion),
      genders: parseCsvParam(gender),
      minAge: minAge ? Number(minAge) : null,
      maxAge: maxAge ? Number(maxAge) : null,
      categories: parseCsvParam(productCategory),
      tags: parseCsvParam(tags),
      paymentMethods: parseCsvParam(paymentMethod),
      startDate: startDate || null,
      endDate: endDate || null
    };

    // Age range validation
    if (filters.minAge !== null && filters.maxAge !== null && filters.minAge > filters.maxAge) {
      return res.status(400).json({ error: "Invalid age range: minAge > maxAge" });
    }

    const pagination = {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10
    };

    const sorting = {
      sortBy: sortBy || "date",
      sortOrder: sortOrder || "desc"
    };

    const result = await fetchSales(filters, sorting, pagination);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
