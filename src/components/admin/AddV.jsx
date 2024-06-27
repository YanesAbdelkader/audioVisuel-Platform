import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth-Context';

function AddV() {
    const { AdminConnected } = useContext(AuthContext);
    AdminConnected();
    const { idC } = useParams();
    const navigate = useNavigate(); 
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        video: null,
        course_id: idC,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, video: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('video', formData.video);
        form.append('course_id', formData.course_id);
    
        try {
            const response = await api.post('/video/add', form, {
                onUploadProgress: (progressEvent) => {
                    const uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setProgress(uploadPercentage);
                },
            });
    
            if (response.status === 200) {
                navigate(`/admin/manage-videos/${idC}`);
            } else {
                setError(response.data.message || 'Error adding video');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError(error.message || 'Error uploading file');
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h1>Add new Video</h1>
                {error && (
                    <div className='error' onClick={() => setError(null)}>
                        <h4>{Array.isArray(error) ? error.join(', ') : error}</h4>
                    </div>
                )}
                {progress > 0 && <progress style={{width:'100%',color:'red'}} value={progress} max="100" />}
                <label htmlFor="name">Title</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='title..'
                    required
                />
                <label htmlFor="video">Video</label>
                <input
                    type='file'
                    accept='video/*'
                    name="video"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddV;
