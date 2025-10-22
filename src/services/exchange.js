import axios from 'axios';
import config from '../../config.js';

export const getExchangeRate = async () => {
  try {
    const url = `https://v6.exchangerate-api.com/v6/${config.EXCHANGE}/latest/DOP`;
    const res = await axios.get(url);
    const data = res.data;

    if (!data || data.result !== "success" || !data.conversion_rates.USD) {
      throw new Error("La API no devolvió la tasa de cambio DOP→USD.");
    }

    return parseFloat(data.conversion_rates.USD);
  } catch (error) {
    console.error("Error al obtener la tasa de cambio:", error.message);
    throw error;
  }
};