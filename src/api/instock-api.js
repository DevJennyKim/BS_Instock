import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//warehouse
const getWarehouses = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/warehouses`);
    return data;
  } catch (error) {
    console.error('Could not get warehouses list:', error);
    throw new Error('Error getting warehouse list.');
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

const addWarehouse = async (newWarehouse) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/warehouses`,
      newWarehouse
    );
    return data;
  } catch (error) {
    console.error('Could not add warehouse:', error);
    throw new Error('Error adding warehouse.');
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
    console.error('Could not update warehouse:', error);
    throw new Error('Error updating warehouse.');
  }
};

//===========================================================================================================================================
//inventory

const getInventories = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/inventories`);
    return data;
  } catch (error) {
    console.error('Could not get inventories list:', error);
    throw new Error('Error getting inventories list.');
  }
};

const addInventoryItem = async (itemData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/inventories`, itemData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to add inventory item');
  }
};

const updateInventoryItem = async (updatedItem, itemId) => {
  try {
    const { warehouse_name, ...updateData } = updatedItem;
    const { data } = await axios.put(
      `${baseUrl}/api/inventories/${itemId}`,
      updateData
    );
    return data;
  } catch (error) {
    console.error('Could not update inventory item:', error);
    throw new Error('Error updating inventory item.');
  }
};

const getInventoryItemById = async (itemId) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/inventories/${itemId}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Warehouse with ID ${itemId} not found`);
    }
    throw new Error(`Could not fetch warehouse details: ${error.message}`);
  }
};

export {
  getWarehouses,
  getWarehouseById,
  getInventories,
  addWarehouse,
  updateWarehouse,
  addInventoryItem,
  updateInventoryItem,
  getInventoryItemById,
};
