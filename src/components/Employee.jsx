import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddUser from "./AddUserForm";
import Swal from "sweetalert2";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/data.json");
      setEmployees(response.data);
      localStorage.setItem("employees", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const addUser = (newUser) => {
    const updatedEmployees = [...employees, newUser];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleBlock = async (id, blocked) => {
    const action = blocked ? "unblock" : "block";
    const confirmMessage = `Are you sure you want to ${action} this employee?`;
    const successMessage = `Employee has been ${action}ed successfully.`;

    Swal.fire({
      title: confirmMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees(
          employees.map((employee) => {
            if (employee.id === id) {
              return { ...employee, blocked: !blocked };
            }
            return employee;
          })
        );
        localStorage.setItem("employees", JSON.stringify(employees));
        Swal.fire("Success!", successMessage, "success");
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees(employees.filter((employee) => employee.id !== id));
        Swal.fire(
          "Deleted!",
          "Employee has been deleted successfully.",
          "success"
        );
      }
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-blue-500">Asif Inc</h1>
      <AddUser addUser={addUser} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Employee List
        </h2>
        {employees.length === 0 ? (
          <p className="text-center font-semibold text-red-400">
            Currently, no employee data available!
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-300 bg-opacity-70">
                <th className="border px-4 py-2 ">Full Name</th>
                <th className="border px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 bg-opacity-60">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border px-4 py-2 text-center">{`${employee.firstName} ${employee.lastName}`}</td>
                  <td className="border px-4 py-2 text-center">
                    <Link
                      to={{
                        pathname: `/employee/${employee.id}`,
                        state: employee,
                      }}
                      className="border-blue-500 p-1 border-2 rounded-lg mx-2 text-blue-700 font-semibold hover:text-blue-700"
                    >
                      Details
                    </Link>
                    {employee.blocked ? (
                      <button
                        className="border-red-500 p-1 border-2 rounded-lg text-green-700 font-semibold mx-2"
                        onClick={() => handleBlock(employee.id, true)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="border-blue-500 p-1 border-2 rounded-lg text-orange-700 mx-2 font-semibold"
                        onClick={() => handleBlock(employee.id, false)}
                      >
                        Block
                      </button>
                    )}
                    <button
                      className="border-blue-500 p-1 border-2 rounded-lg font-semibold text-red-600 mx-2"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
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
