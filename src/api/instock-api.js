import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getWarehouses = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/warehouses`);
    return data;
  } catch (error) {
    console.error("Could not get warehouses list:", error);
    throw new Error("Error getting warehouse list.");
  }
};

const getWarehouseById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/warehouses/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Warehouse with ID ${id} not found`);
    }
    throw new Error(`Could not fetch warehouse details: ${error.message}`);
  }
};

const getInventories = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/inventories`);
    return data;
  } catch (error) {
    console.error("Could not get inventories list:", error);
    throw new Error("Error getting inventories list.");
  }
};

const addWarehouse = async (newWarehouse) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/warehosues`,
      newWarehouse
    );
    return data;
  } catch (error) {
    console.error("Could not add warehouse:", error);
    throw new Error("Error adding warehouse.");
  }
};

export { getWarehouses, getWarehouseById, getInventories, addWarehouse };
