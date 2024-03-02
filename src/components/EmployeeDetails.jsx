import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        const employeeData = response.data.find(emp => emp.id === parseInt(id));
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <div className="mt-8">
        {employee ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Employee Details</h2>
            <div className="text-center">
              <p><strong>Full Name:</strong> {`${employee.firstName} ${employee.lastName}`}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
            </div>
          </div>
        ) : (
          <p className="text-center font-semibold text-red-400">Employee not found!</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
