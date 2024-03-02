import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddUser = ({ addUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phoneNumber) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
      });
      return;
    }
    addUser({ firstName, lastName, email, phoneNumber });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    Swal.fire({
      title: 'Success',
      text: 'Employee added successfully',
      icon: 'success',
    });
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-[500px] bg-gray-200">
      <div className="max-w-md w-full mx-auto bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
