import React, { useContext, useEffect, useState } from 'react';
import '../../styles/HistoryC.css';
import { ClockCounterClockwise } from 'phosphor-react';
import { AuthContext } from '../../contexts/Auth-Context';
import { useNavigate } from 'react-router-dom';
import { userHistory } from '../../services/CourseServices';

function History() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected();
  const navigate = useNavigate();
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const fetchedHistory = await userHistory();
      console.log(fetchedHistory);
      setHistorys(fetchedHistory);
    };
    fetchHistory();
  }, []);

  return (
    <div className='body-contanier'>
      <h2>Your History :</h2>
      {historys.length > 0 ? (
        historys.map((history) => (
          <div className='history-contanier' key={history.id}>
            <ClockCounterClockwise size={32} />
            <span>
              <h3>In :</h3>
              <b>{history.purchase_date}</b>
            </span>
            <span>
              <h3>You did buy :</h3>
              <ul>
                {history.courses.map((course) => (
                  <li key={course.id}>{course}</li>
                ))}
              </ul>
            </span>
            <span>
              <h3>Amount : </h3>
              <b> {history.total_price} DA</b>
            </span>
          </div>
        ))
      ) : (
        <p className='buyCourse' onClick={() => navigate('/courses')}>
          You didn't buy courses for the moment, Click to buy one!!
        </p>
      )}
    </div>
  );
}

export default History;
