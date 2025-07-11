import axiosInstance from './axiosInstance';

export const getNavigationPath = async (start, end) => {
  try {
    const response = await axiosInstance.get('/navigation/path', {
    params: { start, end },
    });
    return response.data;
  } catch (error) {
    console.error('Navigation path fetch failed:', error);
    throw error;
  }
};