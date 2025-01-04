import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
       const response = await axios.get(`${BASE_URL}/categories`)
        return response.data                                                      
    } catch (error) {
      console.log('Error in fetching Categories', error);
      return [
        {
            "_id": "67674a4bddc6efb5bb0642d9",
            "name": "Cleaning Essentials",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/pfbuktnsxdub5njww7tj.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d6",
            "name": "Home & Office",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/diucqrlsuqympqtwdkip.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d3",
            "name": "Pharma & Wellness",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/n438dcddfgrhyq9mck3z.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d5",
            "name": "Munchies",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/vyakccm3axdyt8yei8wc.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d2",
            "name": "Milk, Curd & Paneer",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/cq7m7yxuttemyb4tkidp.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d4",
            "name": "Vegetables & Fruits",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/uic8gcnbzknosdvva13o.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d8",
            "name": "Ata, Rice & Dal",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/flyjbsigiuxsd4pbwpjb.png",
            "__v": 0
        },
        {
            "_id": "67674a4bddc6efb5bb0642d7",
            "name": "Baby Care",
            "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/f6er254kgnmymlbguddd.png",
            "__v": 0
        }
    ]
    }
    // try {
    //   const response = await fetch(`${BASE_URL}/categories`);
  
    //   // Check if the response status is OK
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
  
    //   const data = await response.json();
    //   console.log('Fetched categories:', data);
  
    //   return data; // Return the data if needed
    // } catch (error:any) {
    //   console.error('Fetch error:', error.message || error);
    //   return []; // Return an empty array on error
    // }
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