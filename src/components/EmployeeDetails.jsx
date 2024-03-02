import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        console.log("Response data:", response.data); // Check response data
  
        const employeeData = response.data.find(
          (emp) => emp.id === parseInt(id)
        );
        console.log("Employee data:", employeeData); // Check employee data
  
        if (employeeData) {
          setEmployee(employeeData);
          setFullName(`${employeeData.firstName} ${employeeData.lastName}`);
          setPhoneNumber(employeeData.phone);
        } else {
          console.error("Employee not found");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
  
    fetchData();
  }, [id]);
  
  
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Update employee data in local storage
    const updatedEmployee = {
      ...employee,
      firstName: fullName.split(" ")[0],
      lastName: fullName.split(" ")[1],
      phone: phoneNumber,
    };
    localStorage.setItem(`employee_${id}`, JSON.stringify(updatedEmployee));

    // Update state with the changes
    setEmployee(updatedEmployee);
    setEditMode(false);
  };

  const handleCancel = () => {
    // Reset fields to original data
    setFullName(`${employee.firstName} ${employee.lastName}`);
    setPhoneNumber(employee.phone);
    setEditMode(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mt-8">
        {employee ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Employee Details
            </h2>
            <div className="text-center">
              <table className="mx-auto h-48 border-collapse border border-gray-200">
                <tbody>
                  <tr>
                    <td className="font-semibold border border-gray-200 px-4 py-2">
                      Full Name:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="border border-gray-300 px-2 py-1 rounded"
                        />
                      ) : (
                        <span>{fullName}</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold border border-gray-200 px-4 py-2">
                      Email:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {employee.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold border border-gray-200 px-4 py-2">
                      Phone:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border border-gray-300 px-2 py-1 rounded"
                        />
                      ) : (
                        <span>{phoneNumber}</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                {editMode ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center font-semibold text-blue-400">Loading</p>
        )}
      </div>
      <div className="mt-10 justify-center items-center text-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md mr-1"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
