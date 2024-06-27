import React, { useContext, useEffect, useState } from 'react'
import '../../styles/ModifierIC.css'
import { AuthContext } from '../../contexts/Auth-Context';
import { updateUser, userInfo } from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

function ModifierIC() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email:  '',
    name: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  useEffect(()=>{
    const fetchUserInfo = async ()=>{
      const fetchedUserInfo = await userInfo();
      if(fetchedUserInfo.status = 200){
        setFormData({
          firstname: fetchedUserInfo.user.firstname,
          lastname: fetchedUserInfo.user.lastname,
          email:  fetchedUserInfo.user.email,
          name: fetchedUserInfo.user.name,
          password: fetchedUserInfo.user.password,
        });
        setUser({
          firstname: fetchedUserInfo.user.firstname,
          lastname: fetchedUserInfo.user.lastname,
          email:  fetchedUserInfo.user.email,
          name: fetchedUserInfo.user.name,
          password: fetchedUserInfo.user.password,
        })
      }
      else {
        console.error(fetchedUserInfo.error);
      }
    }
    fetchUserInfo();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if(formData.name !== user.name){
      form.append('name', formData.name);
    }
    if(formData.firstname !== user.firstname){
      form.append('firstname', formData.firstname);
    }
    if(formData.lastname !==user.lastname){
      form.append('lastname', formData.lastname);
    }
    if(formData.email !== user.email){
      form.append('email', formData.email);
    }
    form.append('password', formData.password)
    try {
      const response = await updateUser(form);
      navigate('/profile/2');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1>Modify your Info :</h1>
          {error && (
          <div className="error" onClick={() => setError(null)}>
            <h4>{error}</h4>
          </div>
        )}
          <label htmlFor="firstname">FirstName</label>
          <input type="text" name="firstname" placeholder='name...' value={formData.firstname} onChange={handleChange}/>
          <label htmlFor="lastname">LastName</label>
          <input type='text' name="lastname" id="" placeholder='surname...' value={formData.lastname} onChange={handleChange}/>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder='email...' value={formData.email} onChange={handleChange}/>
          <label htmlFor="name">UserName</label>
          <input type="text" name="name" placeholder='username...' value={formData.name} onChange={handleChange}/>
          <h1 className='h1'>Confirm with your password :</h1>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder='password...' required value={formData.password} onChange={handleChange}/>
          <button type="submit">Modify</button>
        </form>
      </div>
  )
}

export default ModifierIC