import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const DATA_API = `${REMOTE_SERVER}/api/data`;

export const getData = async () => {
  const response = await axiosWithCredentials.get(`${DATA_API}`);
  return response.data;
};

export const updateData = async (data: any) => {
  const response = await axiosWithCredentials.put(`${DATA_API}/${data._id}`, data);
  return response.data;
};
