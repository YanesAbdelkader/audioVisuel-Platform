import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth-Context';
import { useParams } from 'react-router-dom';
import { removeVideo } from '../../services/CourseServices';
import '../../styles/RemoveV.css';

function RemoveV() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  
  const { idV } = useParams();
  const [error, setError] = useState('');

  const handleRemoveVideo = async () => {
    try {
      await removeVideo(idV);
      window.history.back();
    } catch (error) {
      setError('Error removing video');
      console.error('Error removing video:', error);
    }
  };

  return (
    <div className="remove-video-container">
      {error ? (
        <div className='error'>
          <h4 onClick={() => setError('')}>{error} - Click here to dismiss</h4>
        </div>
      ) : (
        <div className='container'>
          <p>Are you sure you want to remove this video?</p>
          <button className="btn remove-btn" onClick={handleRemoveVideo}>Remove Video</button>
          <button className="btn cancel-btn" onClick={() => window.history.back()}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default RemoveV;
