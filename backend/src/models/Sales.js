// backend/src/models/Sales.js
import mongoose from "mongoose";

// Flexible schema so CSV ke saare fields as-is aa jayein
const salesSchema = new mongoose.Schema({}, { strict: false });

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
