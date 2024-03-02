import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddUser from './AddUserForm';

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const addUser = (newUser) => {
    setEmployees([...employees, newUser]);
  };

  return (
    <div className="container mx-auto mt-8">
      <AddUser addUser={addUser} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Employee List</h2>
        {employees.length === 0 ? (
          <p className="text-center font-semibold text-red-400">Currently, no employee data available!</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{`${employee.firstName} ${employee.lastName}`}</td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/employee/${employee.id}`} className="mr-2 text-blue-700 font-semibold hover:text-blue-700">Details</Link>
                    <button className="font-semibold text-yellow-600 hover:text-yellow-700 mx-4 ">Block</button>
                    <button className="font-semibold text-red-700 ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employee;
