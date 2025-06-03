import { axiosInstance } from "../libs/utils";

//đăng nhập

export const loginAPI = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error in loginAPI:", error);
    throw error;
  }
};

export const createEmployeeAPI = async (name, email, role, phone, address) => {
  try {
    const response = await axiosInstance.post("/employee", {
      name,
      email,
      role,
      phone,
      address,
    });
    return response.data;
  } catch (error) {
    console.error("Error in create:", error);
    throw error;
  }
};

export const getAllEmployeeAPI = async () => {
  try {
    const response = await axiosInstance.get("/employee");
    return response.data;
  } catch (error) {
    console.error("Error in getEmployeeAPI:", error);
    throw error;
  }
};

export const deleteEmployee = async (email) => {
  try {
    const response = await axiosInstance.delete(`/employee/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error in getEmployeeAPI:", error);
    throw error;
  }
};
