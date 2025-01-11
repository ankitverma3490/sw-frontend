import {View,StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors} from '@utils/Constants';
import SideBar from './SideBar';
import { getAllCategories, getProductsByCategoryId } from '@services/ProductService';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';
import { navigate } from '@utils/Navigation';

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
 
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search onPress={()=>navigate('ProductDashboard')}/>
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
