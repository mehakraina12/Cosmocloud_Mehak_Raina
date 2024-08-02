import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/empmanagement/${id}`, {
          headers: {
            'projectId': '66ac89b9a7587fb96278f66f',
            'environmentId': '66ac89b9a7587fb96278f670',
          }
        });
        console.log('Employee data:', response.data); // Debugging step
        setEmployee(response.data);
      } catch (error) {
        console.error('Failed to fetch employee!', error.response ? error.response.data : error.message);
      }
    };
  
    fetchEmployee();
  }, [id]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '2rem',
      color: '#343a40',
    },
    detailsContainer: {
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      backgroundColor: '#ffffff',
      maxWidth: '800px',
      width: '100%',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '16px',
    },
    text: {
      fontSize: '1rem',
      marginBottom: '12px',
    },
    list: {
      listStyleType: 'disc',
      paddingLeft: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employee Details</h1>
      </div>
      {employee ? (
        <div style={styles.detailsContainer}>
          <h2 className="text-3xl font-bold mb-4">{employee.name}</h2>
          <p style={styles.text}><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
          <h2 style={styles.sectionTitle}>Contact Methods</h2>
          <ul style={styles.list}>
            {employee.contact_methods.map((method, index) => (
              <li key={index} style={styles.text}>{method.contact_method}: {method.value}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmployeeDetails;
