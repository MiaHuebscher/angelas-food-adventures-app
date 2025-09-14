import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const RESTAURANTS_API = `${REMOTE_SERVER}/api/restaurants`;

export const findAllRestaurants = async () => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}`);
  return response.data;
};

export const findRestaurantByPartialName = async (restName: string) => {
  const response = await
    axiosWithCredentials.get(`${RESTAURANTS_API}?restName=${restName}`);
  return response.data;
};

export const findRestaurantByPartialCity = async (cityName: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?cityName=${cityName}`);
  return response.data;
};

export const findUsersByState = async (state: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?state=${state}`);
  return response.data;
};

export const findUsersByCountry = async (country: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?country=${country}`);
  return response.data;
};

export const findUsersByCuisine = async (cuisine: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?cuisine=${cuisine}`);
  return response.data;
};

export const findUsersBySource = async (source: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?source=${source}`);
  return response.data;
};

export const findUsersByAngelasRating = async (angelasRating: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?angelasRating=${angelasRating}`);
  return response.data;
};

export const findUsersByAddedBy = async (addedBy: string) => {
  const response = await axiosWithCredentials.get(`${RESTAURANTS_API}?addedBy=${addedBy}`);
  return response.data;
};

export const deleteRestaurant = async (restId: string) => {
  const response = await axiosWithCredentials.delete( `${RESTAURANTS_API}/${restId}` );
  return response.data;
};

export const updateRestaurant = async (restaurant: any) => {
  const response = await axiosWithCredentials.put(`${RESTAURANTS_API}/${restaurant._id}`, restaurant);
  return response.data;
};

export const createRestaurant = async (restaurant: any) => {
  const response = await axiosWithCredentials.post(`${RESTAURANTS_API}`, restaurant);
  return response.data;
};