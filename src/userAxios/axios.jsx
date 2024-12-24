import { axiosInstance, axiosBest } from './configAxios';

export const fetchProductsNew = async (type) => {
    try {
        const url = type === 'ivyModa' ? '/new/id' : '/new/ivymen';
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
};
export const fetchProductsBest = async (type) => {
  try {
      const url = type === 'ivyModa' ? '/ivy' : '/ivymen';
      const response = await axiosBest.get(url);
      return response.data;
  } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      throw error;
  }
};


export const fetchProductDetailsNew = async (type, id) => {
    try {
      if (!id) {
        throw new Error('ID is undefined');
      }
  
      const url = type === 'ivyModa' ? `/new/id/${id}` : `/new/ivymen/${id}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error.message);
      throw error;
    }
  };

  export const fetchProductDetailsBest = async (type, id) => {
    try {
      if (!id) {
        throw new Error('ID is undefined');
      }
  
      const url = type === 'ivyModa' ? `/id/${id}` : `/ivymen/${id}`;
      const response = await axiosBest.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error.message);
      throw error;
    }
  };
