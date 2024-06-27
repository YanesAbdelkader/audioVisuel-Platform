import React, { useContext, useEffect, useState } from 'react';
import '../../styles/AnalyseA.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { fetchInvoices as fetchInvoicesService } from '../../services/CourseServices';

function AnalyseA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    try {
      const fetchedInvoices = await fetchInvoicesService();
      setInvoices(fetchedInvoices || []);
    } catch (error) {
      setError('Error fetching invoices');
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className='invoices-container'>
      <h1>Our Invoices :</h1>
      <table>
        <thead>
          <tr>
            <th className='th'>Client</th>
            <th className='th'>Courses</th>
            <th className='th'>Price</th>
            <th className='th'>Date invoice</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className='td'>{invoice.user_name}</td>
                <td className='td'>
                  <ul>
                    {invoice.courses.map((course) => (
                      <li key={course.id}>{course}<br /></li>
                    ))}
                  </ul>
                </td>
                <td className='td'>{invoice.total_price} DA</td>
                <td className='td'>{invoice.purchase_date} </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className='td'>No invoices available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyseA;
