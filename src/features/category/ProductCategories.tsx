import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors} from '@utils/Constants';
import SideBar from './SideBar';
import { getAllCategories, getProductsByCategoryId } from '@services/ProductService';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';

const ProductCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLOading, setCategoriesLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

const fetchCategories = async ()=>{
    try {
        setCategoriesLoading(true)
        const data = await getAllCategories()
      //   const data = [
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d9",
      //         "name": "Cleaning Essentials",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/pfbuktnsxdub5njww7tj.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d6",
      //         "name": "Home & Office",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/diucqrlsuqympqtwdkip.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d3",
      //         "name": "Pharma & Wellness",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/n438dcddfgrhyq9mck3z.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d5",
      //         "name": "Munchies",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/vyakccm3axdyt8yei8wc.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d2",
      //         "name": "Milk, Curd & Paneer",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/cq7m7yxuttemyb4tkidp.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d4",
      //         "name": "Vegetables & Fruits",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/uic8gcnbzknosdvva13o.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d8",
      //         "name": "Ata, Rice & Dal",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444869/category/flyjbsigiuxsd4pbwpjb.png",
      //         "__v": 0
      //     },
      //     {
      //         "_id": "67674a4bddc6efb5bb0642d7",
      //         "name": "Baby Care",
      //         "image": "https://res.cloudinary.com/dponzgerb/image/upload/v1723444870/category/f6er254kgnmymlbguddd.png",
      //         "__v": 0
      //     }
      // ]
          setCategories(data)
        if(data && data.length>0){
            console.log("setSelectedCategory",setSelectedCategory(data[0]))
            setSelectedCategory(data[0])
        }
    } catch (error) {
        console.log("Error in fetching Categories" , error)
    }finally{
        setCategoriesLoading(false)
    }
}
const fetchProducts = async (categoryId:string)=>{
  try {
      setProductsLoading(true)
      const data = await getProductsByCategoryId(categoryId)
    //   const data = [
    //     {
    //         "_id": "67674a4bddc6efb5bb0642dd",
    //         "name": "Amul Gold Cream Milk",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/assets/products/sliding_images/jpeg/1c0db977-31ab-4d8e-abf3-d42e4a4b4632.jpg?ts=1706182142",
    //         "price": 34,
    //         "discountPrice": 38,
    //         "quantity": "500 ml",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642de",
    //         "name": "Gowardhan Panner",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/123007a.jpg?ts=1688973208",
    //         "price": 89,
    //         "discountPrice": 99,
    //         "quantity": "200 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642df",
    //         "name": "Amul Salted Butter",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/7514beed-37f7-4c8c-b50a-4b39842009b8.jpg?ts=1707312315",
    //         "price": 58,
    //         "discountPrice": 60,
    //         "quantity": "100 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e0",
    //         "name": "Amul Masti Curd",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/6525a6e8-5d03-46db-b5e7-b5b4f778b693.jpg?ts=1708592369",
    //         "price": 35,
    //         "discountPrice": 40,
    //         "quantity": "400 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e1",
    //         "name": "Amul Cheese Slices",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/0f895474-ac1e-4f52-9587-891e32ab1ba9.jpg?ts=1707312315",
    //         "price": 85,
    //         "discountPrice": 90,
    //         "quantity": "100 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e2",
    //         "name": "Amul Taaza Toned Fresh Milk",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/5ee4441d-9109-48fa-9343-f5ce82b905a6.jpg?ts=1706182143",
    //         "price": 98,
    //         "discountPrice": 120,
    //         "quantity": "500 ml",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e3",
    //         "name": "Gyan Paneer",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/275980a.jpg?ts=1703652197",
    //         "price": 98,
    //         "discountPrice": 120,
    //         "quantity": "250 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e4",
    //         "name": "Amul Blend Diced Cheese",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/439697a.jpg?ts=1688471557",
    //         "price": 125,
    //         "discountPrice": 125,
    //         "quantity": "200 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e5",
    //         "name": "BranO Plus Brown Bread",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/438253a.jpg?ts=1687615978",
    //         "price": 35,
    //         "discountPrice": 38,
    //         "quantity": "300 g",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67674a4bddc6efb5bb0642e6",
    //         "name": "Nestle Milkmaid",
    //         "image": "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/2d48ef3c-4323-40ec-8f90-a84add8382bb.jpg?ts=1708953276",
    //         "price": 380,
    //         "discountPrice": 400,
    //         "quantity": "348 g",
    //         "__v": 0
    //     }
    // ] 
        setProducts(data)
       
  } catch (error) {
      console.log("Error in fetching Products" , error)
  }finally{
      setProductsLoading(false)
  }
}
useEffect(()=>{
    fetchCategories()
    fetchProducts("1")
},[])
// useEffect(()=>{
// if(selectedCategory?._id){
//   fetchProducts(selectedCategory?._id)
// }
// },[selectedCategory])

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLOading ? (
          <ActivityIndicator size="small" color={Colors.border} />
        ) : (
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category:any)=>setSelectedCategory(category)}
          />
        )}
        {productsLoading?(<ActivityIndicator size='large' color={Colors.border} style={styles.center}/>):
        (<ProductList data={products || []} />)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default withCart(ProductCategories)
