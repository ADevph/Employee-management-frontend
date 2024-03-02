import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddUser from './AddUserForm';
import Swal from 'sweetalert2';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    const addUser = (newUser) => {
      setEmployees([...employees, newUser]);
    };
  
    const handleBlock = async (id, blocked) => {
      const action = blocked ? 'unblock' : 'block';
      const confirmMessage = `Are you sure you want to ${action} this employee?`;
      const successMessage = `Employee has been ${action}ed successfully.`;
      
      Swal.fire({
        title: confirmMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${action} it!`
      }).then((result) => {
        if (result.isConfirmed) {
          setEmployees(employees.map(employee => {
            if (employee.id === id) {
              return { ...employee, blocked: !blocked };
            }
            return employee;
          }));
          Swal.fire(
            'Success!',
            successMessage,
            'success'
          );
        }
      });
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
                      <Link to={`/employee/${employee.id}`} className="mx-2 text-blue-700 font-semibold hover:text-blue-700">Details</Link>
                      {employee.blocked ? (
                        <button className="text-green-700 font-semibold mx-2" onClick={() => handleBlock(employee.id, true)}>Unblock</button>
                      ) : (
                        <button className="text-orange-700 mx-2 font-semibold" onClick={() => handleBlock(employee.id, false)}>Block</button>
                      )}
                      <button className="font-semibold text-red-600 mx-2" onClick={() => handleDelete(employee.id)}>Delete</button>
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