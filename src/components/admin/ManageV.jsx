import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/ManageV.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { VideoPlayer, fetchVideo, updateVideo } from '../../services/CourseServices';

function ManageV() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const { idC, idV } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    videoFile: null,
  });
  const [video, setVideo] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await fetchVideo(idV);
        if (response) {
          setVideo(response);
          setFormData({
            name: response.name,
            position: response.position,
            videoFile: response.path,
          });
        }
      } catch (error) {
        setError('Error fetching video');
        console.error('Error fetching video:', error);
      }
    };

    getVideo();
  }, [idC, idV]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, videoFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if (formData.name !== video.name) {
      form.append('name', formData.name);
    }
    if (formData.position !== video.position) {
      form.append('position', formData.position);
    }
    if (formData.videoFile && formData.videoFile !== video.path) {
      form.append('video', formData.videoFile);
    }
  
    try {
      await updateVideo(idV, form);
      setSuccess('Video updated successfully');
      navigate(`/admin/manage-videos/${idC}`);
      setError(null);
    } catch (error) {
      setError('Error updating video');
      setSuccess(null);
    }
  };
  

  return (
    <div className='video-container'>
      {video.path && <VideoPlayer autoPlay path={video.path} />}
      <form onSubmit={handleSubmit}>
        {error && <div className='error' onClick={() => setError(null)}>{error}</div>}
        {success && <div className='success' onClick={() => setSuccess(null)}>{success}</div>}
        <label htmlFor="position">Position</label>
        <input
          type="number"
          name='position'
          min={1}
          max={video.videomax}
          value={formData.position}
          onChange={handleChange}
        />
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="video">Video</label>
        <input
          type="file"
          accept='video/*'
          name='video'
          onChange={handleFileChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ManageV;
