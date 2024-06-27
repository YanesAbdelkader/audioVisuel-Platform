import { useEffect, useRef, useState } from 'react';
import api from './api';

export const fetchCourses = async () => {
  try {
    const response = await api.get('/courses');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw error;
  }
};

export const fetchUserCourses = async () => {
  try {
    const response = await api.get(`/user/courses`)
    if (response.status === 200) {
      return response.data.courses;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export const fetchUserVideos = async (id) => {
  try {
    const response = await api.get(`/user/courses/${id}/videos`)
    console.log(response.data)
    if (response.status === 200) {
      return response.data.videos;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
}


export const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    if (response.status === 200) {
      return response.data[0]; 
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error(`Failed to fetch course with id ${id}:`, error);
      throw error;
  }
};

export const fetchCourseBySearch = async (search) => {
  try {
    const response = await api.post(`/courses/search/${search}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error(`Failed to fetch courses with search term "${search}":`, error);
      throw error;
  }
};

export const fetchCategory = async () => {
  try {
    const response = await api.get('/category');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/category/${id}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users/index', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data[0]; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchInvoices = async () => {
  try {
    const response = await api.get('/invoices');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
  }
}


export const userHistory = async () =>{
  try {
    const response = await api.get('/user/history');
    return response.data;

  } catch (error) {
    console.error(error);
    return response.error;
  }
}

export const addCourse = async (form) => {
  try {
    const response = await api.post('/courses/add', form, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error; 
  }
};

export const updateCourse = async (id, form) => {
  try {
    const response = await api.post(`/courses/${id}/update`, form, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (idC)=>{
  const response = await api.post(`/courses/${idC}/remove`);
  if (response.status === 200) {
    return response;
    
  }
  else{
    throw new Error('Error deleting category');
  }
}

export const videoCourses = async (idC) => {
  try {
    const response = await api.get(`/courses/${idC}/videos`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
}


export const addCategory = async (formData) => {
  try {
    const response = await api.post('/category/add', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response; 
  } catch (error) {
    console.error('Error adding category:', error);
    return { status: 500, message: 'Server error' };
  }
};



export const deleteCategory = async (idCat) => {
  try {
    const response = await api.post(`/category/${idCat}/remove`);
      if (response.status ===200) {
        return response;
      }
  } catch (error) {
    
    console.error('Error adding category:', error);
  }
  
};



export const updateVideo = async (idC,form) => {
  try {
    const response = await api.post(`/videos/${idC}/update`, form, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating video:', error.response.data.error);
    throw error;
  }
};

export const fetchVideo = async (idV) => {
  try {
    const response = await api.get(`/videos/${idV}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const removeVideo = async (idV) => {
  try {
    const response = await api.post(`/video/remove/${idV}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }});
      console.log(response)
    if (response.status !== 200) {
      throw new Error('Error deleting video');
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

export const updateCategory = async (idCat,form) => {
  try {
    const response = await api.post(`/category/${idCat}/update`, form, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};



export const VideoPlayer = ({ path }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideo = async () => {
      try {
        const response = await api.get(`/watch/${path}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        });
        const videoBlob = response.data;
        const url = URL.createObjectURL(videoBlob);
        
        if (isMounted) {
          setVideoUrl(url);
        }
      } catch (error) {
        if (isMounted) {
          setError('Error fetching video');
          console.error('Error fetching video:', error);
        }
      }
    };

    if (isVisible) {
      fetchVideo();
    }

    return () => {
      isMounted = false;
    };
  }, [isVisible, path]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  if (error) return <p className='error'>{error}</p>;

  return (
    <div ref={videoRef}>
      {isVisible && videoUrl ? (
        <video src={videoUrl} controls muted />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


