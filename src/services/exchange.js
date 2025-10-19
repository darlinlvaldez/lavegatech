import axios from 'axios';
import config from '../../config.js';

export const getExchangeRate = async () => {
  try {
    const res = await axios.get(`http://data.fixer.io/api/convert`, {
      params: {
        access_key: config.EXCHANGE,
        from: 'DOP',
        to: 'USD',
        amount: 1
      }
    });

    const data = res.data;

    if (!data || !data.result) {
      throw new Error('La API no devolvió el resultado de la tasa de cambio.');
    }

    return parseFloat(data.result);
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error.message);
    throw error; 
  }
};
