
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        const employeeData = response.data.find(emp => emp.id === parseInt(id));
        setEmployee(employeeData);
        setFullName(`${employeeData.firstName} ${employeeData.lastName}`);
        setPhoneNumber(employeeData.phone);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Update employee data here (API call, state update, etc.)
    setEditMode(false);
    // Assume updating employee data and resetting fields
    setFullName(`${employee.firstName} ${employee.lastName}`);
    setPhoneNumber(employee.phone);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mt-8">
        {employee ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Employee Details</h2>
            <div className="text-center">
              <table className="mx-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold">Full Name:</td>
                    <td>
                      {editMode ? (
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      ) : (
                        <span>{fullName}</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Email:</td>
                    <td>{employee.email}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Phone:</td>
                    <td>
                      {editMode ? (
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      ) : (
                        <span>{phoneNumber}</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                {editMode ? (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleSave}>Save</button>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleEdit}>Edit</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center font-semibold text-blue-400">Loading</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
