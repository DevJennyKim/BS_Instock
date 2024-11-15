import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//warehouse
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

const getInventoryItemById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/inventories/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Inventory item with ID ${id} not found`);
    }
    throw new Error(`Could not fetch inventory item details: ${error.message}`);
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

const getInventoryByWarehouseId = async (warehouseId) => {
  try {
      const response = await axios.get(`${baseUrl}/api/warehouses/${warehouseId}/inventories`);
      return response.data;
  } catch (error) {
      console.error("Error getting warehouse inventory:", error);
      console.error("Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url
      });
      throw error;
  }
};

const addWarehouse = async (newWarehouse) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/warehouses`,
      newWarehouse
    );
    return data;
  } catch (error) {
    console.error("Could not add warehouse:", error);
    throw new Error("Error adding warehouse.");
  }
};

const updateWarehouse = async (updatedWarehouse, warehouseId) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/warehouses/${warehouseId}`,
      updatedWarehouse
    );
    return data;
  } catch (error) {
    console.error("Could not update warehouse:", error);
    throw new Error("Error updating warehouse.");
  }
};

const deleteWarehouse = async (warehouseId) => {
  try {
    await axios.delete(`${baseUrl}/api/warehouses/${warehouseId}`);
    return;
  } catch (error) {
    console.error("Could not delete warehouse:", error);
    throw new Error("Error deleting warehouse.");
  }
};

const deleteInventoryItem = async (inventoryItemId) => {
  try {
    await axios.delete(`${baseUrl}/api/inventories/${inventoryItemId}`);
    return;
  } catch (error) {
    console.error("Could not delete inventory item:", error);
    throw new Error("Error deleting inventory item.");
  }
};

export {
  getWarehouses,
  getWarehouseById,
  getInventoryItemById,
  getInventories,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  deleteInventoryItem,
  getInventoryByWarehouseId
};
