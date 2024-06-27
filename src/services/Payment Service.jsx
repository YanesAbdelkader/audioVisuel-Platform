import api from './api';

export const checkout = async (cart) => {
  try {
    const response = await api.post('/user/checkout', cart);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Error processing checkout');
  }
};
