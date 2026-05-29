import axios from "axios";

const BASE_URL = "https://emissions-dashboard-4.onrender.com/api/emissions/";

export const getEmissions = () => {
  return axios.get(`${BASE_URL}/api/emissions/`);
};

export const ingestSAP = (data) => {
  return axios.post(`${BASE_URL}/api/ingest/sap/`, data);
};

export const ingestUtility = (data) => {
  return axios.post(`${BASE_URL}/api/ingest/utility/`, data);
};

export const ingestTravel = (data) => {
  return axios.post(`${BASE_URL}/api/ingest/travel/`, data);
};
export const updateStatus = (id, action) => {
  return axios.post(`${BASE_URL}/api/emissions/${id}/status/`, {
    action,
  });
};