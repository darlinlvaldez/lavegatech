import config from "../../config.js";

const BASE_URL = config.API_URL;

const getAccessToken = async () => {
  const credentials = Buffer.from(
    `${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  
  const data = await response.json();

  return data.access_token;
};

export const createPayPalOrder = async (totalUSD) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 
    'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'USD', value: totalUSD } }]
    }),
  })

  const data = await response.json();

  return data;
};

export const capturePayPalOrder = async (paypalOrderId) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 
    'Content-Type': 'application/json' },
  })

  const data = await response.json();

  return data;
};