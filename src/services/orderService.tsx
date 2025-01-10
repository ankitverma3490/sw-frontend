import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: '677a7c85f4056b06c3c99087',
      totalPrice: totalPrice,
    });
    return response.data;
  } catch (error) {
    console.log('Create order Error', error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.log('Fetch order Error', error);
    return null;
  }
};

export const fetchCustomerOrders = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {
    console.log('Fetch customer order Error', error);
    return null;
  }
};

export const fetchOrders = async (
  status: string,
  branchId: string,
  userId: string,
) => {
   let uri =
    status === 'available'
      ? `order?status=${status}&branchId=${branchId}`
      : `order?branchId=${userId}&deliveryPartnerId=${branchId}&status=delivered`;
  try {
    const response = await appAxios.get(uri);
    return response.data;
  } catch (error) {
    console.log('Fetch Delivery order Error', error);
    return null;
  }
};

export const sendLiveOrderUpdates  = async (id: string , location:any,status:string) => {
  try {
    const response = await appAxios.patch(`/order/${id}/status`,{
       deliveryPersonLocation:location,
       status
    });
    return response.data;
  } catch (error) {
    console.log('SendLiveOrderUpdates Error', error);
    return null;
  }
};

export const confirmOrder  = async (id: string , location:any) => {
  try {
    const response = await appAxios.post(`/order/${id}/confirm`,{
       deliveryPersonLocation:location
    });
    return response.data;
  } catch (error) {
    console.log('Confirm order Error', error);
    return null;
  }
};