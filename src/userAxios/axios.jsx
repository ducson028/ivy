import { axiosInstance } from './configAxios';

export const fetchProducts = async (type) => {
    try {
        const url = type === 'ivyModa' ? '/new/id' : '/new/ivymen';
        console.log('url: ', type)
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
};


export const fetchProductDetails = async (type, id) => {
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
