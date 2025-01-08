import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
       const response = await axios.get(`${BASE_URL}/categories`)
        return response.data                                                      
    } catch (error) {
      console.log('Error in fetching Categories', error);
      return []
    }
  };
  export const getProductsByCategoryId = async (id:string) => {
    try {
       const response = await axios.get(`${BASE_URL}/products/67674a4bddc6efb5bb0642d2`);
        return response.data;
    } catch (error) {
      console.log('Error in fetching products by id', error);
      return []
    }
  };