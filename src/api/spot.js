/* eslint-disable no-useless-catch */
// /api/spot.js
import axiosInstance from './axiosInstance.js';

export async function fetchAvailableSpots(vehicleType) {
  try {
    const response = await axiosInstance.get('/spots/available', {
      params: { vehicleType },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function reserveSpot(spotId) {
  try {
    const response = await axiosInstance.post('/spots/reserve', { spotId });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function releaseSpot(spotId) {
  try {
    const response = await axiosInstance.post('/spots/release', {
      spotId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
