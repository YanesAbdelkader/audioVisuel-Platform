import React, { useContext, useState } from 'react'
import '../../styles/ModifierIC.css'
import { AuthContext } from '../../contexts/Auth-Context';
import { updateUserPassword } from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

function ModifierP() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    cnpassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password === formData.cnpassword){
      const form = new FormData();
      form.append('oldPassword', formData.oldPassword);
      form.append('newPassword', formData.newPassword);
      try {
        await updateUserPassword(form);
        navigate('/profile/2');
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
  };
  console.error();
  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1>Modify your Password :</h1>
          {error && (
          <div className="error" onClick={() => setError(null)}>
            <h4>{error}</h4>
          </div>
        )}
          <label htmlFor="oldPassword">Old Password</label>
          <input type="password" name="oldPassword" placeholder='password...' required value={formData.oldPassword} onChange={handleChange}/>
          <label htmlFor="newPassword">New Password</label>
          <input type='password' name="newPassword" placeholder='new password...' required value={formData.newPassword} onChange={handleChange}/>
          <label htmlFor="cnpassword">Confirm new Password</label>
          <input type="password" name="cnpassword" placeholder='confirm password...' required value={formData.cnpassword} onChange={handleChange}/>
          <button type="submit">Modify</button>
        </form>
      </div>
  )
}

export default ModifierP