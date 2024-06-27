import api from './api';

export const loginUser = async (data) => {
  try {
    const response = await api.post('/login', data);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.token);
      return { data: response.data, error: null };
    } else {
      return { data: null, error: response.data.error || 'Login failed' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 422) {
        return { data: null, error: error.response.data.error || 'Invalid email or password' };
      }
    }
    return { data: null, error: 'An unexpected error occurred' };
  }
};


export const signupUser = async (data) => {
  try {
    const response = await api.post('/register', data);
    if (response.status === 200 || response.status === 201) {
      return { data: response.data, error: null };
    } else {
      return { data: null, error: response.data.error || 'Signup failed' };
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      return { data: null, error: error.response.data.error };
    } else {
      return { data: null, error: error.message || 'An error occurred' };
    }
  }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};



export const loginAdmin = async (data) => {
  try {
    const response = await api.post('/admin/login', data);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      return { data: response.data, error: null };
    } else {
      return { data: null, error: response.data || 'Login failed' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 422) {
        return { data: null, error: error.response.data || 'Invalid email or password' };
      }
    }
    return { data: null, error: 'An unexpected error occurred' };
  }
};


export const userInfo = async ()=>{
  try {
    const response = await api.get('/user/info')
    return response.data
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
}

export const updateUser = async (form)=>{
  try {
    const response = await api.post('/user/update',form)
    return response.data
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
}

export const updateUserPassword = async (form)=>{
  try {
    const response = await api.post('/user/password/update',form)
    console.log(response.data)
    return response
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
}