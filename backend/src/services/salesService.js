// backend/src/services/salesService.js
import Sales from "../models/Sales.js";

/**
 * filters: {
 *   search, regions, genders, minAge, maxAge,
 *   categories, tags, paymentMethods, startDate, endDate
 * }
 * sorting: { sortBy, sortOrder }
 * pagination: { page, pageSize }
 */
export const fetchSales = async (filters, sorting, pagination) => {
  const query = {};

  // 🔍 Search on customer_name OR phone_number
  // 🔍 Search on name / phone / product / region
if (filters.search) {
  const regex = new RegExp(filters.search, "i"); // case-insensitive

  query.$or = [
    // Different possible field names for customer name
    { customer_name: regex },        // snake_case
    { customerName: regex },         // camelCase
    { "Customer Name": regex },      // CSV header style

    // Phone fields
    { phone_number: { $regex: filters.search, $options: "i" } },
    { phoneNumber: { $regex: filters.search, $options: "i" } },
    { "Phone Number": { $regex: filters.search, $options: "i" } },

    // Extra: product / region bhi search ho jaaye to accha lagta hai
    { product_name: regex },
    { productName: regex },
    { "Product Name": regex },
    { customer_region: regex },
    { customerRegion: regex },
    { "Customer Region": regex },
  ];
}


  // 🌍 Customer Region (multi-select)
  if (filters.regions.length) {
    query.customer_region = { $in: filters.regions };
  }

  // 🚻 Gender (multi-select)
  if (filters.genders.length) {
    query.gender = { $in: filters.genders };
  }

  // 🎂 Age Range
  if (filters.minAge !== null || filters.maxAge !== null) {
    query.age = {};
    if (filters.minAge !== null) query.age.$gte = filters.minAge;
    if (filters.maxAge !== null) query.age.$lte = filters.maxAge;
  }

  // 📦 Product Category (multi-select)
  if (filters.categories.length) {
    query.product_category = { $in: filters.categories };
  }

  // 🏷️ Tags – match ANY tag
  if (filters.tags.length) {
    query.tags = { $regex: filters.tags.join("|"), $options: "i" };
  }

  // 💳 Payment Methods
  if (filters.paymentMethods.length) {
    query.payment_method = { $in: filters.paymentMethods };
  }

  // 📅 Date Range
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = filters.startDate;
    if (filters.endDate) query.date.$lte = filters.endDate;
  }

  // 🔽 Sorting
  let sortField = "date";
  let sortDirection = -1; // DESC (newest first)

  switch (sorting.sortBy) {
    case "quantity":
      sortField = "quantity";
      break;
    case "customerName":
      sortField = "customer_name";
      sortDirection = 1; // A–Z
      break;
    case "date":
    default:
      sortField = "date";
      sortDirection = -1;
  }

  const page = pagination.page || 1;
  const pageSize = pagination.pageSize || 10;

  const totalItems = await Sales.countDocuments(query);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const safePage = Math.min(page, totalPages);
  const skip = (safePage - 1) * pageSize;

  const data = await Sales.find(query)
    .sort({ [sortField]: sortDirection })
    .skip(skip)
    .limit(pageSize)
    .lean();

  return {
    data,
    pagination: {
      page: safePage,
      pageSize,
      totalItems,
      totalPages
    }
  };
};
