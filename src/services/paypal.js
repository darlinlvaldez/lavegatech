
import config from "../../config.js";

const BASE_URL = process.env.API_URL;

const getAccessToken = async () => {
  const credentials = Buffer.from(
    `${config.CLIENT_ID}:${config.CLIENT_SECRET}`
  ).toString('base64');

  const { access_token } = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  }).then(r => r.json());

  return access_token;
};

export const createPayPalOrder = async (totalUSD) => {
  const accessToken = await getAccessToken();

  return fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'USD', value: totalUSD } }]
    }),
  }).then(r => r.json());
};

export const capturePayPalOrder = async (paypalOrderId) => {
  const accessToken = await getAccessToken();

  return fetch(`${BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  }).then(r => r.json());
};