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

export { getWarehouses };