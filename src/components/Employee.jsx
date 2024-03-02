import React, { useState } from 'react';
import AddUser from './AddUserForm'; 

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const addUser = (newUser) => {
    setEmployees([...employees, newUser]);
  };

  return (
    <div className="container mx-auto mt-8">
      <AddUser addUser={addUser} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Employees</h2>
        {employees.length === 0 ? (
          <p> No employee data. Add now! </p>
        ) : (
<table className="w-full sm:w-400 md:w-800 text-center items-center justify-center sm:ml-0 sm:mx-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.map((employee, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{`${employee.firstName} ${employee.lastName}`}</td>
                  <td className="border px-4 py-2 text-center">
                    <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded-md">Details</button>
                    <button className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded-md">Block</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
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
