import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Eye, EyeClosed } from 'phosphor-react';
import { AuthContext } from '../../contexts/Auth-Context';
import { useParams } from 'react-router-dom';
import { fetchUserVideos } from '../../services/CourseServices';
import api from '../../services/api';
import '../../styles/PlayCourse.css';

function PlayCourse() {
  const { ClinetConnected } = useContext(AuthContext);

  const { idC } = useParams();
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
    ClinetConnected();

  const date= (date)=>{
    const dateObject = new Date(date);
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    return `${year} ${month} ${day}`;
  }
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await fetchUserVideos(idC);
        setVideos(fetchedVideos);
        setSelectedVideoId(fetchedVideos[0].id)
      } catch (error) {
        setError('Error fetching videos');
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [idC]);

  useEffect(() => {
    const fetchVideoPath = async (video) => {
      try {
        const response = await api.get(`/watch/${video.path}`, {
          responseType: 'blob',
        });
        const videoBlob = response.data;
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
      } catch (error) {
        setError('Error fetching video');
        console.error('Error fetching video:', error);
      }
    };

    if (selectedVideoId !== null) {
      const video = videos.find(v => v.id === selectedVideoId);
      if (video) {
        fetchVideoPath(video);
      }
    }
  }, [selectedVideoId, videos]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className='player-container'>
      <div className='player'>
        {videoUrl && (
          <>
            <ReactPlayer
              height='60%'
              width='100%'
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              controls
              autoplay
              url={videoUrl}
            />
            {selectedVideoId && (
              <>
                <h1>{videos.find(v => v.id === selectedVideoId)?.name}</h1>
                <p>
                  Created on the : {date(videos.find(v => v.id === selectedVideoId)?.created_at)}
                </p>
              </>
            )}
          </>
        )}
      </div>
      <div className='playList'>
        <h1>Videos :</h1>
        {error && <p className='error' onClick={() => setError(null)}>{error}</p>}
        <ul>
          {videos.length > 0 ? (
            videos.sort((a, b) => a.position - b.position).map((video) => (
              <li key={video.id} onClick={() => handleVideoSelect(video.id)}>
                <span>
                  {selectedVideoId === video.id ? (
                    <Eye className='icon' size={25} />
                  ) : (
                    <EyeClosed className='icon' size={25} />
                  )}
                  {video.name}
                </span>
              </li>
            ))
          ) : (
            <li>No videos available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PlayCourse;
