import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/ManageVC.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { VideoPlayer, videoCourses } from '../../services/CourseServices';

function ManageVC() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const { idC } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState();

  const fetchCourseVideos = async () => {
    try {
      const fetchedVideos = await videoCourses(idC);
      setVideos(fetchedVideos);
    } catch (error) {
      setError('Error fetching videos');
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchCourseVideos();
  }, [idC]);

  return (
    <div className='manage-container' style={{marginLeft:'-3%'}}>
      <div>
        <h1>Videos :</h1>
        <button
          className='add-btn'
          style={{ marginLeft: '10%' }}
          onClick={() => navigate(`/admin/add-video/${idC}`)}
        >
          Add video
        </button>
        {error && <p className='error' onClick={() => setError(null)}>{error}</p>}
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th className='head'>Video</th>
              <th className='head'>Position</th>
              <th className='head'>Title</th>
              <th className='head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {videos.length > 0 ? (
              videos
                .sort((a, b) => a.position - b.position)
                .map((video) => (
                <tr key={video.id}>
                  <td className='body'>
                    <VideoPlayer path={video.path} />
                  </td>
                  <td className='body'>{video.position}</td>
                  <td className='body'>{video.name}</td>
                  <td className='body'>
                    <Link to={`/admin/manage-videos/${idC}/modifier/${video.id}`}>
                      <button>modifier</button>
                    </Link>
                    <Link to={`/admin/manage-videos/${idC}/remove/${video.id}`}>
                      <button>remove</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='td'>This course has no videos!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default ManageVC;
